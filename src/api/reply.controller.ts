import { firebase } from '@react-native-firebase/firestore';
import { db } from '.';
import { Comment, Reply } from '../types';
import { collections } from './constants';
/**
 * Adding comment to specific Content
 * @param {reply}  Reply - `reply Object which user have added to comment`
 */
export const addReply = async (reply: any) => {
  try {
    const response = await db()
      .collection(collections.replies)
      .add({
        ...reply,
      });
    await db()
      .collection(collections.replies)
      .doc(response.id)
      .update({ id: response.id });

    await db()
      .collection(collections.comments)
      .doc(reply.commentID)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion(reply.id),
      });
    return { data: null, message: 'Reply added Successfully' };
  } catch (error) {
    console.log('error add reply', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Getting All Replies of specific comment
 * @param {contentID}  contentID - `passing commentID for getting specific comment Replies`
 */

export const getAllReplies = async (commentID: string) => {
  try {
    const comments: Reply[] = [];
    const response = await db()
      .collection(collections.replies)
      .where('commentID', '==', commentID)
      .get();
    if (response.empty) {
      return { data: null, message: 'Dont have any Replies' };
    } else {
      response.forEach(res => {
        const data: any = res.data();
        comments.push(data);
      });
      return { data: comments, message: 'All Replies' };
    }
  } catch (error) {
    console.log('getAllReplies error', error);
    return { data: null, message: 'Something went wrong' };
  }
};
