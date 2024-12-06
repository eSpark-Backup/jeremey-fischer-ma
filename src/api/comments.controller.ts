import { db } from '.';
import { Comment, Content } from '../types';
import { collections } from './constants';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { getGroupById } from './groups.controller';
import { getFcmsOfRequiredUser, sendNotification } from './notification.controller';

/**
 * Adding comment to specific Content
 * @param {comment}  Comment - `comment Object which user have added to content`
 */
export const addComments = async (comment: any, engagedUsers: (string)[]) => {
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

    const fcmsTokens = await getFcmsOfRequiredUser(
      engagedUsers,
      'Comments',
    );
    sendNotification(
      fcmsTokens,
      `${comment?.userName} added a comment in a post where you're engaged`,
      comment?.message ?? '',
    );
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

export const getAllCommentByContentID = async (contentID: string) => {
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

export const getAllGroupInboxData = async (
  userId: string,
): Promise<{ data: Content[] | null; message: string }> => {
  try {
    const response = await db()
      .collection(collections.comments)
      .where('receiverGroupId', '!=', null)
      .get();

    if (response.empty) {
      return { data: null, message: 'No comments found' };
    }

    const processedGroupIds = new Set<string>();
    let unviewedContents: Content[] = [];

    for (const doc of response.docs) {
      const contentData: any = doc.data();
      const receiverGroupId = contentData.receiverGroupId;

      if (processedGroupIds.has(receiverGroupId)) {
        continue;
      }

      const groupContent = await getGroupById(receiverGroupId, userId);

      if (groupContent && groupContent.data?.contents) {
        if (groupContent.data.contents.length > 0) {
          unviewedContents = [
            ...unviewedContents,
            ...groupContent.data.contents,
          ];
        }
      }

      processedGroupIds.add(receiverGroupId);
    }

    if (unviewedContents.length > 0) {
      return {
        data: unviewedContents,
        message: 'Group content fetched successfully',
      };
    }

    console.log('No group content matches the criteria');
    return { data: null, message: 'No group content matches the criteria' };
  } catch (error) {
    console.error('getAllGroupInboxData error', error);
    return { data: null, message: 'Something went wrong' };
  }
};
