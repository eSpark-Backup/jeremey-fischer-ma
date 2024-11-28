import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import moment from 'moment';
import { Avatar, Icon } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';

import { GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { PostView } from '../../api/postView.controller';
import store from '../../store/store';
import { addToArchive, getAllArchive } from '../../api/archive.controller';
import loaders from '../../store/loaders';
import { getGroups } from '../../utils';
import { colors } from '../../theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: moment.Moment;
  replies?: Reply[];
  hasReplied?: boolean;
};

interface Reply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: moment.Moment;
};

export default function Details() {
  const navigation = useNavigation();
  const [isArchived, setIsArchived] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newReply, setNewReply] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const userData = useHookstate(store?.userData);
  const contentDetailsStore = useHookstate(store?.contentDetails);
  const contentDetails = contentDetailsStore.get();
  const loader = useHookstate(loaders?.contentDetails);
  const { colors } = useTheme();

  useEffect(() => {
    if (!contentDetails?.isViewed) {
      markAsSeen();
    }
    getAllArchives();
  }, [contentDetails?.isViewed]);


  const handleSendComment = async () => {
    const newCommentObject = {
      id: new Date().toISOString(),
      userId: userData?.get()?.['uid'],
      userName: userData?.get()?.['userName'],
      comment: newComment,
      timestamp: moment(),
    };
    setComments([newCommentObject, ...comments]);
    setNewComment('');
  };

  async function markAsSeen() {
    loader.set(true);
    const res = await PostView(contentDetails?.id!, userData?.get()?.['uid']!);
    getGroups();
  }

  async function getAllArchives() {
    loader.set(true);
    try {
      const res = await getAllArchive(userData?.get()?.['uid'] ?? '');
      if (res?.data != null) {
        setIsArchived(res?.data.some(item => item?.content?.id === contentDetails?.id));
      }
    } catch (e) {
      console.log('Error fetching archives:', e);
    } finally {
      loader.set(false);
    }
  }

  async function handleMoveToArchive() {
    loader.set(true);
    try {
      const res = await addToArchive({
        userId: userData?.get()?.['uid']!,
        contentId: contentDetails?.id!,
      });
      navigation.goBack();
      getGroups();
      contentDetailsStore.set(null);
      getAllArchives();
    } catch (e) {
      console.log('error at add to Archive', e);
      loader.set(false);
    }
  }

  const handleSendReply = async () => {
    if (newReply.trim() && replyingTo) {
      const reply = {
        id: new Date().toISOString(),
        userId: userData?.get()?.['uid'],
        userName: userData?.get()?.['userName'],
        comment: newReply,
        timestamp: moment(),
      };

      const updatedComments = comments.map(comment =>
        comment.id === replyingTo.id
          ? { ...comment, replies: [...(comment.replies || []), reply], hasReplied: true }
          : comment
      );
      setComments(updatedComments);
      setReplyingTo(null);
      setNewReply('');
    }
  };

  return (
    <MyCanvas>
      {loader.get() || contentDetails == null ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 10 }} />
        </View>
      ) : (
        <>
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
                <Image source={{ uri: contentDetails?.image }} style={{ width: 150, height: 100 }} />
              </View>
              <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                <MyText children={contentDetails?.title} />
                <MyText children={contentDetails?.description} textStyle={{ marginTop: 10 }} />
              </View>
            </View>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Avatar
              rounded
              size={40}
              containerStyle={{
                backgroundColor: contentDetails?.sender?.image ? undefined : colors.primary,
              }}
              source={{
                uri: contentDetails?.sender?.image ? contentDetails?.sender?.image : undefined,
              }}
              title={contentDetails?.sender?.image ? undefined : contentDetails?.sender?.userName?.charAt(0)?.toUpperCase()}
            />
            <GapView mode="horizontal" />
            <MyText
              lines={1000}
              textStyle={{
                flex: 1,
                flexWrap: 'wrap',
              }}>
              {contentDetails?.sender != null
                ? contentDetails?.sender?.userName!
                : 'Deleted User'}:
              {contentDetails?.message != '' ? contentDetails?.message! : ''}
            </MyText>
            <MyText
              children={`Shared ${moment.unix(contentDetails?.createdAt?.seconds!).fromNow()}`}
              textStyle={{
                marginRight: 15,
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <OutlineBtn
              title="View"
              onPress={async () => {
                Linking.openURL(contentDetails.url!);
              }}
              btnStyle={{ width: 130 }}
            />
            <GapView mode="horizontal" />
            {isArchived ? (
              <MyText textStyle={{ opacity: 0.5 }} children={'Archived'} />
            ) : (
              <OutlineBtn
                title="Move to Archive"
                onPress={async () => await handleMoveToArchive()}
                btnStyle={{ width: 130 }}
              />
            )}
          </View>

          <View style={{ marginTop: 40, paddingHorizontal: 10 }}>
            <MyText children="Comments" textStyle={{ fontSize: 18, fontWeight: 'bold' }} />
            <View style={{ borderColor: colors.border, borderWidth: 1, marginTop: 8, borderRadius: 5, paddingRight: 10 }}>
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Write a comment..."
                multiline
                placeholderTextColor="#fff"
                style={{
                  color: colors.text,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingRight: 40,
                  height: 'auto',
                  backgroundColor: colors.background,
                  borderRadius: 5,
                }}
              />
              <View style={styles.sendButtonContainer}>
                <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
                  <Icon name="send" color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {comments.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Avatar
                  rounded
                  size={40}
                  containerStyle={{
                    backgroundColor: colors.primary,
                  }}
                  title={comment.userName.charAt(0)}
                />
                <View style={styles.commentContent}>
                  <MyText children={comment.userName} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <MyText children={comment.comment} textStyle={{ flex: 1 }} />
                    <MyText children={moment(comment.timestamp).fromNow()} textStyle={{ marginTop: 5, textAlign: 'right' }} />
                  </View>

                  {!comment.hasReplied && (
                    <TouchableOpacity onPress={() => setReplyingTo(comment)}>
                      <MyText children="Reply" textStyle={{ color: colors.primary, marginTop: 5 }} />
                    </TouchableOpacity>
                  )}

{comment.replies && comment.replies.length > 0 && (
  <View style={styles.repliesContainer}>
    {comment.replies.map((reply, replyIndex) => (
      <View key={replyIndex} style={styles.replyContainer}>
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size={30}
            containerStyle={{
              backgroundColor: colors.primary,
            }}
            title={reply.userName.charAt(0)}
          />
          <View style={styles.replyHeader}>
            <MyText
              children={reply.userName}
              textStyle={{ fontWeight: 'bold' }}
            />
            <MyText
              children={moment(reply.timestamp).fromNow()}
              textStyle={{
                fontSize: 12,
                color: colors.primary,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <MyText
          children={reply.comment}
          textStyle={{
            paddingLeft: 40, // Align the message below username
            color: colors.text,
          }}
        />
      </View>
    ))}
  </View>
)}


                  {replyingTo?.id === comment.id && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, padding: 10, borderRadius: 5 }}>
                      <Avatar
                        rounded
                        size={40}
                        containerStyle={{
                          backgroundColor: colors.primary,
                        }}
                        title={userData?.get()?.['userName']?.charAt(0)?.toUpperCase()}
                      />
                      <TextInput
                        value={newReply}
                        onChangeText={setNewReply}
                        placeholder="Write your reply..."
                        placeholderTextColor='#fff'
                        multiline
                        style={{
                          flex: 1,
                          color: colors.text,
                          marginLeft: 10,
                          padding: 10,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderRadius: 5,
                          height: 50,
                          maxHeight: 100,
                        }}
                      />
                      <TouchableOpacity onPress={handleSendReply} style={styles.sendButton}>
                        <Icon name="send" color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

              </View>
            ))}
          </View>
        </>
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingVertical: 10
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  repliesContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  replyContainer: {
    flexDirection: 'column', // Stack the avatar, header, and message vertically
    marginTop: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row', // Avatar, username, and timestamp on the same row
    alignItems: 'center', // Align vertically
    marginTop: 5,
  },
  replyHeader: {
    flexDirection: 'row', // Username and timestamp are inline
    alignItems: 'center', // Align them horizontally
    marginLeft: 10,
  },
  sendButtonContainer: {
    marginTop: 6,
    marginBottom: 8,
    alignItems: 'flex-end',
    width: '100%',
  },
  sendButton: {
    width: 55,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});