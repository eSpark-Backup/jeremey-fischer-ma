import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { db } from '.';
import { FriendRequest, Group, User } from '../types';
import { collections } from './constants';

/**
 * Create Group with members
 * @param {Group} Group - Must Include *groupCreatorId* also in members array.
 * @returns {Group} return the create `Group` object if it successfully.
 */
export const createGroup = async (data: Group) => {
  try {
    const response = await (
      await db()
        .collection(collections.groups)
        .add({ ...data, contents: [] })
    ).get();
    await db().collection(collections.groups).doc(response.id).update({
      id: response.id,
    });
    return {
      data: { ...response.data(), id: response.id },
      message: 'Group Created Successfully',
    };
  } catch (error) {
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Get Groups of specific user
 * @param {myUid} myUid - Send UID of a current user or a user which groups you need to fetch
 * @returns {Group[]} `Group[]` - return all groups of that user.
 */
export const getMyGroups = async (myUid: string) => {
  try {
    const groups: Group[] = [];
    const response = await db()
      .collection(collections.groups)
      .where('Members', 'array-contains', myUid)
      .get();

    if (response.empty) {
      return { data: null, message: 'You have not add in any group' };
    } else {
      const promises: Promise<void>[] = [];

      response.forEach(async res => {
        const data: any = res.data();
        const Members: any[] = [];
        const contents: any[] = [];
        let groupCreator = null;

        const membersPromise = db()
          .collection(collections.users)
          .where('uid', 'in', data?.Members)
          .get()
          .then(memberSnapshot => {
            memberSnapshot.forEach(member => {
              Members.push(member.data());
            });
          });

        const contentPromise = db()
          .collection(collections.contents)
          .where(
            'id',
            'in',
            Boolean(data?.contents?.length) ? data?.contents : [''],
          )
          .get()
          .then(async contentSnapshot => {
            const innerPromises: any[] = [];
            if (!contentSnapshot.empty) {
              contentSnapshot.forEach(async content => {
                const contentData = content.data();
                var sender: FirebaseFirestoreTypes.DocumentData | null = null;
                const senderPromise = db()
                  .collection(collections.users)
                  .where('uid', '==', contentData?.senderId ?? '')
                  .get()
                  .then(senderSnap => {
                    senderSnap.forEach(res => (sender = res.data()));
                    contentData.sender = sender;
                  });

                const postViewFetch = db()
                  .collection(collections.postViews)
                  .where('contentId', '==', content?.id)
                  .where('userId', '==', myUid)
                  .get()
                  .then(PvSnap => {
                    if (!PvSnap.empty) {
                      contentData.isViewed = true;
                    } else {
                      contentData.isViewed = false;
                    }
                  });

                const archiveFetch = db()
                  .collection(collections.archives)
                  .where('contentId', '==', content?.id)
                  .where('userId', '==', myUid)
                  .get()
                  .then(ArchiveSnap => {
                    if (!ArchiveSnap.empty) {
                      contentData.isArchived = true;
                    } else {
                      contentData.isArchived = false;
                    }
                  });
                innerPromises.push(senderPromise, postViewFetch, archiveFetch);
                await Promise.all([senderPromise, postViewFetch, archiveFetch]);
                contents.push(contentData);
              });
              await Promise.all(innerPromises);
            }
          });

        const groupCreatorPromise = db()
          .collection(collections.users)
          .where('uid', '==', data?.groupCreatorId)
          .get()
          .then(gcSnapshot => {
            gcSnapshot.forEach(gc => {
              groupCreator = gc.data();
            });
          });

        promises.push(membersPromise, groupCreatorPromise, contentPromise);

        await Promise.all([
          membersPromise,
          groupCreatorPromise,
          contentPromise,
        ]);

        data.Members = Members;
        data.groupCreator = groupCreator;
        data.contents = contents;
        groups.push(data);
      });

      await Promise.all(promises);
      return { data: groups, message: 'All Groups' };
    }
  } catch (error) {
    console.log('error getAllGroups', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Get Groups of specific user
 * @param {groupId} groupId - `groupId` for retriving group
 * @param {string} myUid - For Checking is viewed and archived or not.
 * @returns {Group} `Group` - return the required group.
 */
export const getGroupById = async (groupId: string, myUid?: string) => {
  try {
    const response = await db()
      .collection(collections.groups)
      .where('id', '==', groupId)
      .get();

    if (response.empty) {
      return { data: null, message: 'You have not add in any group' };
    } else {
      const promises: Promise<void>[] = [];
      const groups: Group[] = [];
      response.forEach(async res => {
        const data: any = res.data();
        const Members: any[] = [];
        const contents: any[] = [];
        let groupCreator = null;

        const membersPromise = db()
          .collection(collections.users)
          .where('uid', 'in', data?.Members)
          .get()
          .then(memberSnapshot => {
            memberSnapshot.forEach(member => {
              Members.push(member.data());
            });
          });

        const contentPromise = db()
          .collection(collections.contents)
          .where(
            'id',
            'in',
            Boolean(data?.contents?.length) ? data?.contents : [''],
          )
          .get()
          .then(async contentSnapshot => {
            const innerPromises: any[] = [];
            if (!contentSnapshot.empty) {
              contentSnapshot.forEach(async content => {
                const contentData = content.data();
                var sender: FirebaseFirestoreTypes.DocumentData | null = null;
                const senderPromise = db()
                  .collection(collections.users)
                  .where('uid', '==', contentData?.senderId ?? '')
                  .get()
                  .then(senderSnap => {
                    senderSnap.forEach(res => (sender = res.data()));
                    contentData.sender = sender;
                  });

                const postViewFetch = db()
                  .collection(collections.postViews)
                  .where('contentId', '==', content?.id)
                  .where('userId', '==', myUid)
                  .get()
                  .then(PvSnap => {
                    if (!PvSnap.empty) {
                      contentData.isViewed = true;
                    } else {
                      contentData.isViewed = false;
                    }
                  });

                const archiveFetch = db()
                  .collection(collections.archives)
                  .where('contentId', '==', content?.id)
                  .where('userId', '==', myUid)
                  .get()
                  .then(ArchiveSnap => {
                    if (!ArchiveSnap.empty) {
                      contentData.isArchived = true;
                    } else {
                      contentData.isArchived = false;
                    }
                  });
                innerPromises.push(senderPromise, postViewFetch, archiveFetch);
                await Promise.all([senderPromise, postViewFetch, archiveFetch]);
                contents.push(contentData);
              });
              await Promise.all(innerPromises);
            }
          });

        const groupCreatorPromise = db()
          .collection(collections.users)
          .where('uid', '==', data?.groupCreatorId)
          .get()
          .then(gcSnapshot => {
            gcSnapshot.forEach(gc => {
              groupCreator = gc.data();
            });
          });

        promises.push(membersPromise, groupCreatorPromise, contentPromise);

        await Promise.all([
          membersPromise,
          groupCreatorPromise,
          contentPromise,
        ]);

        data.Members = Members;
        data.groupCreator = groupCreator;
        data.contents = contents;
        groups.push(data);
      });

      await Promise.all(promises);
      return { data: groups?.[0], message: 'Required Group' };
    }
  } catch (error) {
    console.log('error getGroupById', error);
    return { data: null, message: 'Something went wrong' };
  }
};
