import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Linking,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import moment from 'moment';
import { Avatar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHookstate } from '@hookstate/core';
import { GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { PostView } from '../../api/postView.controller';
import store from '../../store/store';
import { addToArchive, getAllArchive } from '../../api/archive.controller';
import loaders from '../../store/loaders';
import {
  AddComments,
  AddReply,
  getAllContentComments,
  getGroups,
} from '../../utils';
import { Comment, Reply, RootStackParamList } from '../../types';
import { CommentView } from '../../api/commentView.controller';
import { getNewsFeedContent } from '../../api/content.controller';
import { extractAllFeeds } from '../../utils/globalFunctions';
import { getAllUnviewedInboxUpdates } from '../../api/comments.controller';

type DetailsScreenRouteProps = RouteProp<RootStackParamList, 'Details'>;

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export default function Details() {
  const navigation = useNavigation();
  const [isArchived, setIsArchived] = useState(false);
  const { params } = useRoute<DetailsScreenRouteProps>();
  const newsFeed = useHookstate(store?.newsFeed);
  const loadNewsFeed = useHookstate(loaders?.newsFeed);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newReply, setNewReply] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const userData = useHookstate(store.userData);
  const contentDetailsStore = useHookstate(store.contentDetails);
  const contentDetails = contentDetailsStore.get();
  const contentCommentStore = useHookstate(store.comments);
  const contentComments = contentCommentStore.get();
  const loader = useHookstate(loaders.contentDetails);
  const [hasFetched, setHasFetched] = useState(false);
  const [hasCommentFetched, setCommentFetched] = useState(false);
  const { colors } = useTheme();
  const { item } = params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!contentDetails?.isViewed && isFocused) {
      markAsSeen();
    }
    getAllArchives();
  }, [isFocused]);

  useEffect(() => {
    if (contentDetails && !hasFetched) {
      setHasFetched(true);
      getAllContentComments(contentDetails?.id ?? '');
      if (!contentDetails?.isCommentViewed) {
        commentMarkAsSeen();
      }
    }
  }, [contentDetails]);

  useEffect(() => {
    if (contentComments) {
      const mutableComments = contentComments?.map(comment => ({
        ...comment,
        userName: comment?.userName,
        replies: comment.replies
          ? comment.replies.map(reply => ({
              ...reply,
              userName: reply?.userName,
            }))
          : [],
      }));
      mutableComments.sort(
        (a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds,
      );
      setComments(mutableComments);
    }
  }, [contentCommentStore]);

  async function getNewsFeed() {
    try {
      const data = await getNewsFeedContent(userData?.get()?.['uid'] ?? '');
      if (data?.data != null) {
        newsFeed.set(data?.data);
        extractAllFeeds(data?.data);
      } else {
        newsFeed.set([]);
      }
    } catch (e) {
      console.log('err at newsfeed fetch', e);
    }
  }

  const handleSendComment = async () => {
    const newCommentObject: Comment = {
      id: null,
      contentID: contentDetails?.id ?? '',
      senderID: userData?.get()?.uid,
      receiverGroupId: item.groupId ? item.groupId : null,
      receiverId: item.groupId ? null : getAllEngagedUsers()?.[0],
      userName: userData?.get()?.userName,
      replies: [],
      message: newComment,
      createdAt: new Date(),
    };
    setComments([newCommentObject, ...comments]);
    setNewComment('');
    if (newComment) addComments(newCommentObject);
  };

  const addComments = (addedComment: Comment) => {
    AddComments(addedComment, getAllEngagedUsers()).then(res => {});
  };

  async function markAsSeen() {
    loader.set(true);
    await PostView(contentDetails?.id!, userData?.get()?.uid!);
    getGroups();
  }

  async function commentMarkAsSeen() {
    loader.set(true);
    await CommentView(contentDetails?.id!, userData?.get()?.uid!);
    getNewsFeed();
    getInboxGroupData();
  }

  async function getInboxGroupData() {
    try {
      const res = await getAllUnviewedInboxUpdates(store.userData.get()?.uid);
      loader.set(false);
      // @ts-ignore
      store.groupContent.set(res?.data);
      return res?.data;
    } catch (error) {
      loader.set(false);
      console.error(error);
    }
  }

  async function getAllArchives() {
    loader.set(true);
    try {
      const res = await getAllArchive(userData?.get()?.uid ?? '');
      if (res?.data != null) {
        setIsArchived(
          res?.data.some(item => item?.content?.id === contentDetails?.id),
        );
      }
    } finally {
      loader.set(false);
    }
  }

  async function handleMoveToArchive() {
    loader.set(true);
    try {
      await addToArchive({
        userId: userData?.get()?.uid!,
        contentId: contentDetails?.id!,
      });
      navigation.goBack();
      getGroups();
      contentDetailsStore.set(null);
      getAllArchives();
    } catch {
      loader.set(false);
    }
  }

  const getAllEngagedUsers = (): string[] => {
    let users = [contentDetails?.sender?.uid];
    comments.forEach(val => {
      if (!users.includes(val.senderID)) {
        users.push(val.senderID);
      } else if (!users.includes(val?.receiverId!)) {
        users.push(val.receiverId ?? '');
      }
      val.replies?.forEach(rep => {
        if (!users.includes(rep.senderID)) {
          users.push(val.senderID);
        }
      });
    });
    if (users?.includes(userData?.get()?.uid)) {
      let index = users?.findIndex(val => val == userData?.get()?.uid);
      if (index != -1) {
        users.splice(index, 1);
      }
    }

    return users.filter(Boolean) as string[];
  };

  const handleSendReply = async (commentID: string) => {
    try {
      const reply: Reply = {
        id: new Date().toISOString(),
        commentID: commentID,
        parentId: commentID,
        senderID: userData?.get()?.uid,
        userName: userData?.get()?.userName,
        message: newReply,
        createdAt: new Date(),
        contentID: contentDetails?.id ?? '',
        receiverGroupId: item.groupId ? item.groupId : null,
        receiverId: item.groupId ? null : getAllEngagedUsers()?.[0],
      };
      setComments(prevComments =>
        prevComments?.map(comment =>
          comment.id === commentID
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment,
        ),
      );
      setReplyingTo(null);
      setNewReply('');
      if (newReply) AddReply(reply, contentDetails?.id!, getAllEngagedUsers());
    } catch (error) {
      console.log('handleSendReply error', error);
    }
  };

  return (
    <MyCanvas>
      {loader.get() || contentDetails == null ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
                <Image
                  source={{ uri: contentDetails?.image }}
                  style={{ width: 150, height: 100 }}
                />
              </View>
              <View
                style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                <MyText children={contentDetails?.title} />
                <MyText
                  children={contentDetails?.description}
                  textStyle={{ marginTop: 10 }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            <Avatar
              rounded
              size={40}
              containerStyle={{
                backgroundColor: contentDetails?.sender?.image
                  ? undefined
                  : colors.primary,
              }}
              source={{
                uri: contentDetails?.sender?.image
                  ? contentDetails?.sender?.image
                  : undefined,
              }}
              title={
                contentDetails?.sender?.image
                  ? undefined
                  : contentDetails?.sender?.userName?.charAt(0)?.toUpperCase()
              }
            />
            <GapView mode="horizontal" />
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
              <MyText textStyle={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>
                {contentDetails?.sender != null
                  ? contentDetails?.sender?.userName!
                  : 'Deleted User'}
                :{contentDetails?.message != '' ? contentDetails?.message! : ''}
              </MyText>
              <MyText
                children={`Shared ${moment
                  .unix(contentDetails?.createdAt?.seconds!)
                  .fromNow()}`}
                textStyle={{ fontSize: 12, color: '#808080' }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 20,
            }}>
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

          {!isArchived && (
            <View style={{ marginTop: 25, paddingHorizontal: 10 }}>
              <MyText
                children="Comments"
                textStyle={{ fontSize: 18, fontWeight: 'bold' }}
              />
              <View
                style={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginTop: 8,
                  borderRadius: 5,
                  paddingRight: 10,
                }}>
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
                <View
                  style={[
                    styles.sendButtonContainer,
                    { opacity: !newComment ? 0.7 : 1 },
                  ]}>
                  <TouchableOpacity
                    disabled={!newComment}
                    onPress={() => handleSendComment()}
                    style={styles.sendButton}>
                    <Icon
                      name="paper-plane-sharp"
                      color={colors.primary}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {comments?.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  <Avatar
                    rounded
                    size={40}
                    containerStyle={{
                      backgroundColor: colors.primary,
                    }}
                    title={comment.userName.charAt(0)?.toUpperCase()}
                  />
                  <View style={styles.commentContent}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <MyText
                        children={comment.userName}
                        textStyle={{ fontWeight: 'bold', fontSize: 15 }}
                      />
                      <MyText
                        children={
                          comment?.createdAt
                            ? moment(
                                typeof comment.createdAt === 'object' &&
                                  'seconds' in comment.createdAt
                                  ? comment.createdAt.seconds * 1000
                                  : comment.createdAt,
                              ).fromNow()
                            : 'Unknown time'
                        }
                        textStyle={{
                          marginTop: 5,
                          textAlign: 'right',
                          fontSize: 13,
                        }}
                      />
                    </View>
                    <MyText
                      children={comment.message}
                      textStyle={{ flex: 1, marginTop: 4, fontSize: 13 }}
                    />

                    {/* <TouchableOpacity onPress={() => setReplyingTo(comment)}>
                      <MyText
                        children="Reply"
                        textStyle={{
                          color: colors.primary,
                          marginTop: 5,
                          fontSize: 12,
                        }}
                      />
                    </TouchableOpacity> */}

                    {/* {comment?.replies && comment?.replies?.length > 0 && (
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View
                          style={{
                            width: 1,
                            backgroundColor: 'white',
                            marginRight: 7,
                            marginTop: 5,
                            height: comment.replies.length * 60,
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          {comment?.replies?.map((reply, replyIndex) => {
                            console.log(
                              'reply',
                              Platform.OS,
                              reply.message,
                              reply.userName,
                              reply.id,
                            );

                            return (
                              <View
                                key={replyIndex}
                                style={styles.replyContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Avatar
                                    rounded
                                    size={30}
                                    containerStyle={{
                                      backgroundColor: colors.primary,
                                      marginRight: 10,
                                    }}
                                    title={reply.userName
                                      .charAt(0)
                                      .toUpperCase()}
                                  />
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <MyText
                                        children={reply.userName}
                                        textStyle={{
                                          fontWeight: 'bold',
                                          fontSize: 15,
                                        }}
                                      />
                                      <MyText
                                        children={
                                          reply?.createdAt
                                            ? moment(
                                                typeof reply.createdAt ===
                                                  'object' &&
                                                  'seconds' in reply.createdAt
                                                  ? reply.createdAt.seconds *
                                                      1000
                                                  : reply.createdAt,
                                              ).fromNow()
                                            : 'Unknown time'
                                        }
                                        textStyle={{
                                          fontSize: 12,
                                          color: colors.primary,
                                          marginLeft: 10,
                                        }}
                                      />
                                    </View>
                                    <MyText
                                      children={reply.message}
                                      textStyle={{
                                        fontSize: 13,
                                        color: colors.text,
                                        marginTop: 3,
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )} */}

                    {replyingTo?.id === comment.id && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 8,
                          padding: 10,
                          borderRadius: 5,
                        }}>
                        <Avatar
                          rounded
                          size={40}
                          containerStyle={{
                            backgroundColor: colors.primary,
                          }}
                          title={userData
                            ?.get()
                            ?.['userName']?.charAt(0)
                            ?.toUpperCase()}
                        />
                        <TextInput
                          value={newReply}
                          onChangeText={setNewReply}
                          placeholder="Write your reply..."
                          placeholderTextColor="#fff"
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
                        <TouchableOpacity
                          disabled={!newReply}
                          onPress={() => handleSendReply(comment.id ?? '')}
                          style={[
                            styles.sendButton,
                            { opacity: !newReply ? 0.7 : 1 },
                          ]}>
                          <Icon
                            name="paper-plane-sharp"
                            color={colors.primary}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingVertical: 10,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  repliesContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  replyContainer: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  sendButtonContainer: {
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 15,
    alignItems: 'flex-end',
    width: '100%',
  },
  sendButton: {
    width: 55,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
