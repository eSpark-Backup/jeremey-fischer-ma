import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { createGroup } from '../../../api/groups.controller';
import { searchUser } from '../../../api/user.controller';
import loaders from '../../../store/loaders';
import store from '../../../store/store';
import {
  CommunityNavProps,
  CommunityStackParamList,
  Group,
  User,
} from '../../../types';
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
  const data: Group = {
    groupName: groupName,
    groupCreatorId: store.userData.get()?.uid!,
    Members: members!,
  };
  loaders.createGroup.set(true);
  createGroup(data).then(res => {
    console.log('create Group', JSON.stringify(res));
    loaders.createGroup.set(false);
    getGroups();
    navigation.navigate('GroupsList');
  });
};
