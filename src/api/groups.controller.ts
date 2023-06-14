import {db} from '.';
import {FriendRequest, Group, User} from '../types';
import {collections} from './constants';

export const createGroup = async (data: Group) => {
  try {
    const response = (
      await (await db().collection(collections.groups).add(data)).get()
    ).data();
    return {data: response, message: 'Group Created Successfully'};
  } catch (error) {
    return {data: null, message: 'Something went wrong'};
  }
};

export const getMyGroups = async (myUid: string) => {
  try {
    const groups: Group[] = [];
    const response = await db()
      .collection(collections.groups)
      .where('Members', 'array-contains', myUid)
      .get();

    if (response.empty) {
      return {data: null, message: 'Something went wrong'};
    } else {
      response.forEach(async res => {
        const data: any = res.data();
        var Members: any = [];
        var groupCreator = null;

        (
          await db()
            .collection(collections.users)
            .where('uid', 'in', data?.Members)
            .get()
        ).forEach(member => {
          Members.push(member.data());
        });

        (
          await db()
            .collection(collections.users)
            .where('uid', '==', data?.groupCreatorId)
            .get()
        ).forEach(gc => {
          groupCreator = gc.data();
        });
        data.Members = Members;
        data.groupCreator = groupCreator;
        groups.push(data);
      });
      return {data: groups, message: 'All Groups'};
    }
  } catch (error) {
    console.log('error getAllGroups', error);
    return {data: null, message: 'Something went wrong'};
  }
};
