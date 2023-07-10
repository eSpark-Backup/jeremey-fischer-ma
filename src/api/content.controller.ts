import { db } from '.';
import { Content, NewsFeed } from '../types';
import { collections } from './constants';
import firestore from '@react-native-firebase/firestore';
import {
  getFcmsOfRequiredUser,
  sendNotification,
} from './notification.controller';

/**
 * Share Content to specific group
 * @param {groupId}  groupId - `groupId` for sending content to group
 * @param {senderId}  senderId - `senderId` to track which user send this post
 * @returns {message} `message` return message wheter it succesfull or not .
 */
export const shareContentToGroup = async (
  groupId: string,
  senderId: string,
  Content: Content,
) => {
  try {
    const response = await db()
      .collection(collections.contents)
      .add({
        ...Content,
        createdAt: new Date(),
        senderId: senderId ?? '',
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
    const groups: any = await db()
      .collection(collections.groups)
      .doc(groupId)
      .get();
    const members = groups.data().Members;
    const receivers = members.filter((item: any) => item != senderId);
    const fcmsTokens = await getFcmsOfRequiredUser(
      receivers,
      Content.mediaType,
    );
    sendNotification(fcmsTokens, Content.title, Content.description);
    return { data: null, message: 'Post Shared Successfully' };
  } catch (error) {
    console.log('error shareContentToGroup', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Share Content with friend
 * @param {senderId}  senderId - `senderId` the User which send the contend
 * @param {receiverId}  receiverIds - `receiverIds` Array of User Ids which recieve this content
 * @returns {message} `message` return message wheter it succesfull or not.
 */
export const shareContentWithFriend = async (
  senderId: string,
  receiverIds: string[],
  Content: Content,
) => {
  try {
    const response = await db()
      .collection(collections.contents)
      .add({
        ...Content,
        createdAt: new Date(),
        senderId: senderId ?? '',
      });
    await db()
      .collection(collections.contents)
      .doc(response.id)
      .update({ id: response.id });

    for (let index = 0; index < receiverIds.length; index++) {
      const newsFeedRespone = await db()
        .collection(collections.newsFeed)
        .add({
          contentId: response.id ?? '',
          senderId: senderId ?? '',
          receiverId: receiverIds[index] ?? '',
        });
      await db()
        .collection(collections.newsFeed)
        .doc(newsFeedRespone.id)
        .update({ id: newsFeedRespone.id });
    }
    const fcmsTokens = await getFcmsOfRequiredUser(
      receiverIds,
      Content.mediaType,
    );
    sendNotification(fcmsTokens, Content.title, Content.description);
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
        let content: any = null;
        let sender = null;
        let receiver = null;
        const innerPromises: Promise<void>[] = [];
        const fetchContent = db()
          .collection(collections.contents)
          .doc(newsFeedData?.contentId ?? '')
          .get()
          .then(async contentData => {
            content = contentData.data();
            let isViewed = false;
            let isArchived = false;
            const postViewFetch = db()
              .collection(collections.postViews)
              .where('contentId', '==', content?.id)
              .where('userId', '==', myUid)
              .get()
              .then(PvSnap => {
                if (!PvSnap.empty) {
                  isViewed = true;
                }
              });

            const archiveFetch = db()
              .collection(collections.archives)
              .where('contentId', '==', content?.id)
              .where('userId', '==', myUid)
              .get()
              .then(ArchiveSnap => {
                if (!ArchiveSnap.empty) {
                  isArchived = true;
                }
              });

            innerPromises.push(postViewFetch, archiveFetch);
            await Promise.all([postViewFetch, archiveFetch]);
            content.isViewed = isViewed;
            content.isArchived = isArchived;
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
        await Promise.all([
          fetchContent,
          fetchSender,
          fetchReceiver,
          ...innerPromises,
        ]);

        newsFeedData.sender = sender;
        newsFeedData.receiver = receiver;
        newsFeedData.content = content;
        newsFeed.push(newsFeedData);
      });
      await Promise.all(promises);
      return {
        data: newsFeed.sort(
          (b, a) => a.content.createdAt - b.content.createdAt,
        ),
        message: 'Your Newsfeed Contents',
      };
    }
  } catch (error) {
    console.log('error getNewsFeedContent', error);
    return { data: null, message: 'Something went wrong' };
  }
};
