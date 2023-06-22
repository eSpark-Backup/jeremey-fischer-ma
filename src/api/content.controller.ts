import { db } from '.';
import { NewsFeed } from '../types';
import { collections } from './constants';
import firestore from '@react-native-firebase/firestore';

/**
 * Share Content to specific group
 * @param {groupId}  groupId - `groupId` for sending content to group
 * @param {senderId}  senderId - `senderId` to track which user send this post
 * @returns {message} `message` return message wheter it succesfull or not .
 */
export const shareContentToGroup = async (
  groupId: string,
  senderId: string,
) => {
  try {
    const response = await db()
      .collection(collections.contents)
      .add({
        mediaType: 'Audio',
        createdAt: new Date(),
        title: 'title',
        image: 'image',
        description: 'description',
        senderId: senderId ?? '',
        url: '',
      });
    await db()
      .collection(collections.contents)
      .doc(response.id)
      .update({ id: response.id });
    await db()
      .collection(collections.groups)
      .doc(groupId)
      .update({
        contents: firestore.FieldValue.arrayUnion(response.id),
      });
    return { data: null, message: 'Post Shared Successfully' };
  } catch (error) {
    console.log('error shareContentToGroup', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Share Content with friend
 * @param {senderId}  senderId - `senderId` the User which send the contend
 * @param {receiverId}  receiverId - `receiverId` User which recieve this content
 * @returns {message} `message` return message wheter it succesfull or not.
 */
export const shareContentWithFriend = async (
  senderId: string,
  receiverId: string,
) => {
  try {
    const response = await db()
      .collection(collections.contents)
      .add({
        mediaType: 'Audio',
        createdAt: new Date(),
        title: 'title',
        image: 'image',
        description: 'description',
        senderId: senderId ?? '',
        url: '',
      });
    await db()
      .collection(collections.contents)
      .doc(response.id)
      .update({ id: response.id });

    const newsFeedRespone = await db()
      .collection(collections.newsFeed)
      .add({
        contentId: response.id ?? '',
        senderId: senderId ?? '',
        receiverId: receiverId ?? '',
      });
    await db()
      .collection(collections.newsFeed)
      .doc(newsFeedRespone.id)
      .update({ id: newsFeedRespone.id });
    return { data: null, message: 'Post Shared Successfully' };
  } catch (error) {
    console.log('error shareContentWithFriend', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Fetch User Newsfeed
 * @param {myUid}  myUid - `myUid` is uid of a user which newsfeed needs to be fetched
 * @returns {NewsFeed[]} `NewsFeed[]` Return Newsfeed contents
 */
export const getNewsFeedContent = async (myUid: string) => {
  try {
    const newsFeed: NewsFeed[] = [];
    const promises: Promise<void>[] = [];
    const response = await db()
      .collection(collections.newsFeed)
      .where('receiverId', '==', myUid ?? '')
      .get();
    if (response.empty) {
      return { data: null, message: 'Your newsfeed is empty' };
    } else {
      response.forEach(async value => {
        const newsFeedData: any = value.data();
        let content = null;
        let sender = null;
        let receiver = null;

        const fetchContent = db()
          .collection(collections.contents)
          .doc(newsFeedData?.contentId ?? '')
          .get()
          .then(contentData => {
            content = contentData.data();
          });

        const fetchSender = db()
          .collection(collections.users)
          .where('uid', '==', newsFeedData?.senderId ?? '')
          .get()
          .then(senderSnap => {
            if (!senderSnap.empty) {
              senderSnap.forEach(senderData => {
                sender = senderData.data();
              });
            }
          });

        const fetchReceiver = db()
          .collection(collections.users)
          .where('uid', '==', newsFeedData?.receiverId ?? '')
          .get()
          .then(receiverSnap => {
            if (!receiverSnap.empty) {
              receiverSnap.forEach(receiverData => {
                receiver = receiverData.data();
              });
            }
          });

        promises.push(fetchContent, fetchSender, fetchReceiver);
        await Promise.all([fetchContent, fetchSender, fetchReceiver]);

        newsFeedData.sender = sender;
        newsFeedData.receiver = receiver;
        newsFeedData.content = content;
        newsFeed.push(newsFeedData);
      });
      await Promise.all(promises);
      return { data: newsFeed, message: 'Your Newsfeed Contents' };
    }
  } catch (error) {
    console.log('error getNewsFeedContent', error);
    return { data: null, message: 'Something went wrong' };
  }
};
