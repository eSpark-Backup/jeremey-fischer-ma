import { db } from '.';
import { collections } from './constants';

export const CommentView = async (contentId: string, userId: string) => {
  try {
    console.log('Starting CommentView function...');
    console.log('Received contentId:', contentId);
    console.log('Received userId:', userId);

    const response = await db()
      .collection(collections.commentViews)
      .add({
        contentId: contentId ?? '',
        userId: userId ?? '',
      });


    const docId = response.id;
    console.log('Document ID before update:', contentId);

    await db().collection(collections.commentViews).doc(docId).update({
      id: docId,
    });

    console.log('Document updated successfully with ID:', docId);

    return {
      data: null,
      message: 'Comment Viewed',
    };
  } catch (error) {
    console.error('Error in CommentView function:', error);
    throw new Error('Failed to mark comment as viewed');
  }
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
    querySnapshot.forEach(doc => {
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
