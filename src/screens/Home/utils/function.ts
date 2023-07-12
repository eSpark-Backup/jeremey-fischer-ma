import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { createGroup } from '../../../api/groups.controller';
import { searchUser } from '../../../api/user.controller';
import store from '../../../store/store';
import { Group } from '../../../types';
import { getGroups } from '../../../utils';

export const getSearchedFriend = async (searchVal: string) => {
  store.loadFriends.set(true);
  searchUser(searchVal, store.userData.get()?.uid).then(res => {
    console.log('get searched friend', JSON.stringify(res));
    store.friends.set(res.data);
    store.loadFriends.set(false);
  });
};

export const groupCreation = async (
  groupName: string,
  members: string[],
  navigation: NavigationProp<ParamListBase>,
) => {
  members.push(store.userData.get()?.uid);
  const data: Group = {
    groupName: groupName,
    groupCreatorId: store.userData.get()?.uid!,
    Members: members!,
  };
  store.screenLoading.set(true);
  createGroup(data).then(res => {
    console.log('create Group', JSON.stringify(res));
    store.screenLoading.set(false);
    getGroups();
    navigation.navigate('CommunityTab', { title: 'Groups' });
  });
};
