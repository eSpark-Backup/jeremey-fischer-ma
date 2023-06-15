import {db} from '.';
import {FriendRequest, Group, User} from '../types';
import {collections} from './constants';

/**
 * Create Group with members
 * @param {Group} Group - Must Include *groupCreatorId* also in members array.
 * @returns {Group} return the create `Group` object if it successfully.
 */
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
      return {data: null, message: 'You have not add in any group'};
    } else {
      const promises: Promise<void>[] = [];

      response.forEach(async res => {
        const data: any = res.data();
        const Members: any[] = [];
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

        const groupCreatorPromise = db()
          .collection(collections.users)
          .where('uid', '==', data?.groupCreatorId)
          .get()
          .then(gcSnapshot => {
            gcSnapshot.forEach(gc => {
              groupCreator = gc.data();
            });
          });

        promises.push(membersPromise, groupCreatorPromise);

        await Promise.all([membersPromise, groupCreatorPromise]);

        data.Members = Members;
        data.groupCreator = groupCreator;
        groups.push(data);
      });

      await Promise.all(promises);
      return {data: groups, message: 'All Groups'};
    }
  } catch (error) {
    console.log('error getAllGroups', error);
    return {data: null, message: 'Something went wrong'};
  }
};
