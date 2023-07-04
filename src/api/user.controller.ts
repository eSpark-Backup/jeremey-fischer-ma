import { db } from '.';
import { User } from '../types';
import { collections } from './constants';

/**
 * Fetch All Users
 * @returns {User[]} `User[]` Return Users
 */
export const getAllUsers = async () => {
  try {
    const users: User[] = [];
    const data = await db().collection(collections.users).get();
    if (!data.empty) {
      data.forEach(user => {
        const userData: any = user.data();
        users.push(userData);
      });
      return { data: users, message: 'All Users' };
    } else {
      return { data: users, message: 'User not Found' };
    }
  } catch (error) {
    console.log('error', error);
    return { data: [], message: 'Something went wrong' };
  }
};

/**
 * Login User
 * @param {data}  User - `User` send required data for login
 * @returns {User} `User` Return User if not found so undefined
 */
export const loginUser = async (data: User) => {
  try {
    var userData: User | undefined;
    const isUserExist = await db()
      .collection(collections.users)
      .where('email', '==', data.email)
      .get();
    if (isUserExist.empty) {
      const res = await db()
        .collection(collections.users)
        .add({
          ...data,
          createdAt: new Date(),
          Friends: [],
          Groups: [],
          Notification: [],
          NotificationSetting: {
            whenReceivedNewArticle: true,
            whenReceivedNewMusic: true,
            whenReceivedNewVideo: true,
            whenReceivedNewPodcast: true,
            all: true,
          },
        });
      return { data: (await res.get()).data(), message: 'Login Successfully' };
    } else {
      isUserExist.forEach(res => {
        const data: any = res.data();
        userData = data;
      });
      return { data: userData, message: 'Login Successfully' };
    }
  } catch (error) {
    console.log('err', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Search User
 * @param {email}  email - `email` Email for search by email
 * @param {myUid}  myUid - `myUid` For check is he friend of you or not
 * @param {uid}  uid - `uid` uid for search by uid
 * @returns {User[]} `User[]` Return User if user found
 */
export const searchUser = async (
  email?: string,
  myUid?: string,
  uid?: string,
) => {
  try {
    const users: User[] = [];
    const emailResult = await db()
      .collection(collections.users)
      .where('email', '==', email ?? '')
      .get();

    const uidResult = await db()
      .collection(collections.users)
      .where('uid', '==', uid ?? '')
      .get();

    const result = !emailResult.empty ? emailResult : uidResult;
    if (result.empty) {
      return { data: null, message: 'User Not Found' };
    } else {
      const promises: Promise<void>[] = [];
      result.forEach(async res => {
        const dbData: any = res.data();
        let isRequested = false;
        const fetchRequest = db()
          .collection(collections.friendRequests)
          .where('senderId', '==', myUid ?? '')
          .where('receiverId', '==', dbData.uid ?? '')
          .where('status', '==', 'pending')
          .get()
          .then(FrSnap => {
            if (!FrSnap.empty) {
              isRequested = true;
            }
          });
        promises.push(fetchRequest);
        await Promise.all([fetchRequest]);
        dbData.id = res.id;
        dbData.isRequested = isRequested;
        dbData.isFriend = dbData?.Friends?.includes(myUid ?? '');
        if (!Boolean(users.filter(val => val.uid == dbData.uid).length)) {
          users.push(dbData);
        }
      });
      await Promise.all(promises);
      return { data: users, message: 'User Data' };
    }
  } catch (error) {
    console.log('searchUser errors', error);
    return { data: null, message: 'Something went wrong' };
  }
};

/**
 * Search User
 * @param {myUid}  myUid - `myUid` For getting all friends of this `UID`
 * @returns {User} `User` Return User[]
 */
export const getAllFreinds = async (myUid: string) => {
  try {
    const friends: User[] = [];
    const response = await db()
      .collection(collections.users)
      .where('Friends', 'array-contains', myUid)
      .get();
    if (response.empty) {
      return { data: null, message: 'You have not any friend' };
    } else {
      response.forEach(res => {
        const data: any = res.data();
        friends.push(data);
      });
      return { data: friends, message: 'Your friends' };
    }
  } catch (error) {
    console.log('getAllFreinds error', error);
    return { data: null, message: 'Something went wrong' };
  }
};
