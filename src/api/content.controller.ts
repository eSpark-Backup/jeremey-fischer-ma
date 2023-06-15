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
 * Fetch User Newsfeed
 * @param {myUid}  myUid - `myUid` is uid of a user which newsfeed needs to be fetch
 * @returns {NewsFeed[]} `NewsFeed[]` Return Newsfeed contents
 */
export const getNewsFeedContent = async (myUid: string) => {
  try {
  } catch (error) {}
};
