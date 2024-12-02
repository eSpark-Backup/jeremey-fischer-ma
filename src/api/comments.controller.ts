import { db } from '.';
import { Comment } from '../types';
import { collections } from './constants';

/**
 * Adding comment to specific Content
 * @param {comment}  Comment - `comment Object which user have added to content`
 */
export const addComments = async (comment: any) => {
  try {
    const response = await db()
      .collection(collections.comments)
      .add({
        ...comment,
      });
    await db()
      .collection(collections.comments)
      .doc(response.id)
      .update({ id: response.id });
    return { data: null, message: 'Comment added Successfully' };
  } catch (error) {
    console.log('error add comments', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Getting All Comments of specific content
 * @param {contentID}  contentID - `passing contactID for getting specific content comments`
 */

export const getAllComments = async (contentID: string) => {
  try {
    const comments: Comment[] = [];
    const response = await db()
      .collection(collections.comments)
      .where('contentID', '==', contentID)
      .get();
    if (response.empty) {
      return { data: null, message: 'Dont have any comments' };
    } else {
      response.forEach(res => {
        const data: any = res.data();
        comments.push(data);
      });
      return { data: comments, message: 'All Comments' };
    }
  } catch (error) {
    console.log('getAllComments error', error);
    return { data: null, message: 'Something went wrong' };
  }
};