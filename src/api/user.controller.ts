import {db} from '.';
import {User} from '../types';

export const getAllUsers = async () => {
  try {
    const users: User[] = [];
    const data = await db().collection('users').get();
    if (!data.empty) {
      data.forEach(user => {
        const userData: any = user.data();
        users.push(userData);
      });
      return {data: users, message: 'All Users'};
    } else {
      return {data: users, message: 'User not Found'};
    }
  } catch (error) {
    console.log('error', error);
    return {data: [], message: 'Something went wrong'};
  }
};

export const loginUser = async (data: User) => {
  try {
    var userData: User | undefined;
    const isUserExist = await db()
      .collection('users')
      .where('email', '==', data.email)
      .get();
    if (isUserExist.empty) {
      const res = await db()
        .collection('users')
        .add({
          ...data,
          createdAt: new Date(),
          Friends: [],
          Groups: [],
          Notification: [],
        });
      return {data: (await res.get()).data(), message: 'Login Successfully'};
    } else {
      isUserExist.forEach(res => {
        const data: any = res.data();
        userData = data;
      });
      return {data: userData, message: 'Login Successfully'};
    }
  } catch (error) {
    console.log('err', error);
    return {data: null, message: 'Something went wrong'};
  }
};

export const searchUser = async (email?: string, uid?: string) => {
  try {
    const users: User[] = [];
    const emailResult = await db()
      .collection('users')
      .where('email', '==', email ?? '')
      .get();

    const uidResult = await db()
      .collection('users')
      .where('uid', '==', uid ?? '')
      .get();

    const result = !emailResult.empty ? emailResult : uidResult;
    if (result.empty) {
      return {data: null, message: 'User Not Found'};
    } else {
      result.forEach(res => {
        const dbData: any = res.data();
        users.push(dbData);
      });
      return {data: users, message: 'User Data'};
    }
  } catch (error) {
    console.log('searchUser errors', error);
    return {data: null, message: 'Something went wrong'};
  }
};
