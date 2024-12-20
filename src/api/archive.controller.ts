import { db } from '.';
import { Archive, Content, User } from '../types';
import { collections } from './constants';

/**
 * Add content to Archive
 * @param {data}  {userId: string, contentId: string} - `data` For Add content to archive on behalf of userId
 * @returns {message} `message` Return message wheter it success or not
 */
export const addToArchive = async (data: Archive) => {
  try {
    const response = await db()
      .collection(collections.archives)
      .add({ ...data, createdAt: new Date() });
    await db().collection(collections.archives).doc(response.id).update({
      id: response.id,
    });
    return {
      data: { ...(await response.get()).data(), id: response.id },
      message: 'Content Add to Acrive',
    };
  } catch (error) {
    console.log('AddToArchive error', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Get All archive of a user
 * @param {userId} userId - for fetching all archives of a user
 * @returns {Archive[]} Archive[] - return All acrhives of a user
 */
export const getAllArchive = async (userId: string) => {
  try {
    const archives: Archive[] = [];
    const response = await db()
      .collection(collections.archives)
      .where('userId', '==', userId)
      .get();
    if (response.empty) {
      return {
        data: null,
        message: 'You have not added any content to archive',
      };
    } else {
      const promises: Promise<void>[] = [];
      response.forEach(async (value: any) => {
        const archiveData: Archive = value.data();
        let content: Content | undefined = undefined;
        let user: User | undefined = undefined;
        const innerPromises: Promise<void>[] = [];

        const fetchContent = db()
          .collection(collections.contents)
          .doc(archiveData?.contentId ?? '')
          .get()
          .then(async (contentData: any) => {
            content = contentData.data();
            let sender: User | undefined = undefined;
            const fetchSender = db()
              .collection(collections.users)
              .where('uid', '==', content?.senderId ?? '')
              .get()
              .then(senderSnap => {
                if (!senderSnap.empty) {
                  senderSnap.forEach((senderData: any) => {
                    sender = senderData.data();
                  });
                }
              });
            innerPromises.push(fetchSender);
            await Promise.all([fetchSender]);
            // @ts-ignore
            content.sender = sender;
          });

        const fetchUser = db()
          .collection(collections.users)
          .where('uid', '==', archiveData?.userId ?? '')
          .get()
          .then(userSnap => {
            if (!userSnap.empty) {
              userSnap.forEach((userData: any) => {
                user = userData.data();
              });
            }
          });

        promises.push(fetchContent, fetchUser);
        await Promise.all([fetchContent, fetchUser, ...innerPromises]);
        archiveData.content = content;
        archiveData.user = user;
        archives.push(archiveData);
      });
      await Promise.all(promises);

      return { data: archives.sort(
        // @ts-ignore
        (b, a) => a.createdAt - b.createdAt,
      ), message: 'User Archive Posts' };
    }
  } catch (error) {
    console.log('getAllArchive error', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Remove to Archive
 * @param {id} id - For Deleting entry
 * @returns {message} `message` Return message wheter it success or not
 */
export const removeToArchive = async (id: string) => {
  try {
    if (!Boolean(id)) {
      return { data: null, message: 'Archive id is required' };
    }
    const response = await db()
      .collection(collections.archives)
      .doc(id)
      .delete();

    return { data: null, message: 'Archive Removed Successfully' };
  } catch (error) {
    console.log('getAllArchive error', error);
    return { data: null, message: 'Something went wrong' };
  }
};
