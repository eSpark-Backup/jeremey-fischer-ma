import { db } from '.';
import { collections } from './constants';

export const PostView = async (contentId: string, userId: string) => {
  try {
    const response = await db()
      .collection(collections.postViews)
      .add({
        contentId: contentId ?? '',
        userId: userId ?? '',
      });
    await db().collection(collections.postViews).doc(response.id).update({
      id: response.id,
    });
    return {
      data: null,
      message: 'post Viewed',
    };
  } catch (error) {}
};
