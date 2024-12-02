import { db } from '.';
import { collections } from './constants';

export const CommentView = async (contentId: string, userId: string) => {
  try {
    const response = await db()
      .collection(collections.commentViews)
      .add({
        contentId: contentId ?? '',
        userId: userId ?? '',
      });
    await db().collection(collections.commentViews).doc(response.id).update({
      id: response.id,
    });
    return {
      data: null,
      message: 'Comment Viewed',
    };
  } catch (error) {}
};


export const deleteCommentView = async (contentId: string) => {
  try {
    const querySnapshot = await db()
      .collection(collections.commentViews)
      .where('contentId', '==', contentId)
      .get();

    if (querySnapshot.empty) {
      return {
        data: null,
        message: 'No matching comment views found',
      };
    }

    const batch = db().batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return {
      data: null,
      message: 'Comment View(s) deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting comment view(s):', error);
    throw error; // or return an error message object
  }
};