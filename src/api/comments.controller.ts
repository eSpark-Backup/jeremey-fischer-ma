import { db } from '.';
import { Comment, Content } from '../types';
import { collections } from './constants';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { getGroupById } from './groups.controller';
import { getFcmsOfRequiredUser, sendNotification } from './notification.controller';
import { Platform } from 'react-native';
import { getContentFromContentId } from './content.controller';
import store from '../store/store';

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
        parentId: null
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
      .where('parentId', "==", null)
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

// export const getAllGroupInboxData = async (
//   userId: string,
// ): Promise<{ data: Content[] | null; message: string }> => {
//   try {
//     const response = await db()
//       .collection(collections.comments)
//       .where('receiverGroupId', '!=', null)
//       .get();

//     if (response.empty) {
//       return { data: null, message: 'No comments found' };
//     }

//     const processedGroupIds = new Set<string>();
//     let unviewedContents: Content[] = [];

//     for (const doc of response.docs) {
//       const contentData: any = doc.data();
//       const receiverGroupId = contentData.receiverGroupId;

//       if (processedGroupIds.has(receiverGroupId)) {
//         continue;
//       }

//       const groupContent = await getGroupById(receiverGroupId, userId);
      
//       if (groupContent && groupContent.data?.contents && groupContent.data.Members?.filter((val) => val.uid === userId).length > 0) {
//         if (groupContent.data.contents.length > 0) {
//           unviewedContents = [
//             ...unviewedContents,
//             ...groupContent.data.contents,
//           ];
//         }
//       }

//       processedGroupIds.add(receiverGroupId);
//     }

//       console.log("unviewedContents", JSON.stringify(unviewedContents))
    
//     if (unviewedContents.length > 0) {
//       return {
//         data: unviewedContents,
//         message: 'Group content fetched successfully',
//       };
//     }

//     console.log('No group content matches the criteria');
//     return { data: null, message: 'No group content matches the criteria' };
//   } catch (error) {
//     console.error('getAllGroupInboxData error', error);
//     return { data: null, message: 'Something went wrong' };
//   }
// };

// export const getAllUnviewedInboxUpdates = async (userId: string) => {
//   try {
//     let recieverCommentsContents = [];
//     const recieverCommentsResponse = await db()
//       .collection(collections.comments)
//       .where('receiverId', '==', userId)
//       .get();
//     for (const doc of recieverCommentsResponse.docs) {
//       const contentData: any = doc.data();
//       recieverCommentsContents.push(contentData?.contentID);
//     }

//     let userGroupsIds = [];
//     const userGroupsResponse = await db()
//       .collection(collections.groups)
//       .where('Members', 'array-contains', userId)
//       .get();
//     for (const doc of userGroupsResponse.docs) {
//       const contentData: any = doc.data();
//       userGroupsIds.push(contentData?.id);
//     }


//     const recieverGroupsCommentsResponse = await db()
//       .collection(collections.comments)
//       .where('receiverGroupId', 'in', userGroupsIds)
//       .get();
//     for (const doc of recieverGroupsCommentsResponse.docs) {
//       const contentData: any = doc.data();
//       recieverCommentsContents.push(contentData?.contentID);
//     }

//     let userViewedContents = []
//     const userViewedContentsRes = await db()
//       .collection(collections.commentViews)
//       .where('userId', '==', userId)
//       .where('contentId', "in", recieverCommentsContents)
//       .get()
//       for (const doc of userViewedContentsRes.docs) {
//         const contentData: any = doc.data();
//         userViewedContents.push(contentData?.contentId);
//       }
      
    
//       // Convert arrays to Sets for faster lookups
//       const set1 = new Set(userViewedContents);
//       const set2 = new Set(recieverCommentsContents);
//       const uniqueArr1 = userViewedContents.filter(id => !set2.has(id));
//       const uniqueArr2 = recieverCommentsContents.filter(id => !set1.has(id));
//       const result = [...uniqueArr1, ...uniqueArr2];
      
//       let finalUnreadContents = []
//       for (const item of result) {
//         const contentData = await getContentFromContentId(item, userId);
//         finalUnreadContents.push(contentData?.data)
//         console.log(`Processed ${item}`);
//       }

//      console.log(
//       'finalUnreadContents',
//       Platform.OS,
//       result,
//       finalUnreadContents
//     );

//     return {
//       data: finalUnreadContents,
//       message: 'Inbox Content fetched successfully',
//     };

//   } catch (error) {
//     console.log('recieverCommentsContents error', error);
//   }
// }; 


export const getAllUnviewedInboxUpdates = async (userId: string) => {
  try {
    let recieverCommentsContents: string[] = [];
    const recieverCommentsResponse = await db()
      .collection(collections.comments)
      .where('receiverId', '==', userId)
      .get();
    for (const doc of recieverCommentsResponse.docs) {
      const contentData: any = doc.data();
      recieverCommentsContents.push(contentData?.contentID);
    }

    let userGroupsIds: string[] = [];
    const userGroupsResponse = await db()
      .collection(collections.groups)
      .where('Members', 'array-contains', userId)
      .get();
    for (const doc of userGroupsResponse.docs) {
      const contentData: any = doc.data();
      userGroupsIds.push(contentData?.id);
    }

    let recieverGroupsCommentsContents: string[] = [];
    if (userGroupsIds.length > 0) {
      const recieverGroupsCommentsResponse = await db()
        .collection(collections.comments)
        .where('receiverGroupId', 'in', userGroupsIds)
        .get();
      for (const doc of recieverGroupsCommentsResponse.docs) {
        const contentData: any = doc.data();
        recieverGroupsCommentsContents.push(contentData?.contentID);
      }
    }

    // Combine all content IDs
    recieverCommentsContents = [...recieverCommentsContents, ...recieverGroupsCommentsContents];

    let userViewedContents: string[] = [];
    if (recieverCommentsContents.length > 0) {
      const userViewedContentsRes = await db()
        .collection(collections.commentViews)
        .where('userId', '==', userId)
        .where('contentId', 'in', recieverCommentsContents)
        .get();
      for (const doc of userViewedContentsRes.docs) {
        const contentData: any = doc.data();
        userViewedContents.push(contentData?.contentId);
      }
    }

    // Calculate the difference between viewed and received contents
    const set1 = new Set(userViewedContents);
    const set2 = new Set(recieverCommentsContents);
    const uniqueArr1 = userViewedContents.filter(id => !set2.has(id));
    const uniqueArr2 = recieverCommentsContents.filter(id => !set1.has(id));
    const result = new Set([...uniqueArr1, ...uniqueArr2]);

    let finalUnreadContents: any[] = [];
    for (const item of result) {
      const contentData = await getContentFromContentId(item, userId);
      finalUnreadContents.push({...contentData?.data});
    }

    console.log(
      'finalUnreadContents',
      Platform.OS,
      result,
    );

    return {
      data: finalUnreadContents,
      message: 'Inbox Content fetched successfully',
    };
  } catch (error) {
    console.log('recieverCommentsContents error', error);
    return {
      data: [],
      message: 'Failed to fetch inbox content',
    };
  }
};
