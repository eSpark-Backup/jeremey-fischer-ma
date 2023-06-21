import {
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { State } from '@hookstate/core';

import { Group, HomeStackParamList, User } from '../../../types';
import { getAllFreinds, loginUser } from '../../../api/user.controller';
import { storeUserData } from '../../../utils';
import { getMyGroups } from '../../../api/groups.controller';

export const getFriends = async (
  navigation: NavigationHelpers<ParamListBase>,
  loadFriends: State<boolean, {}>,
  friends: State<User[] | null, {}>,
) => {
  loadFriends.set(true);
  navigation.navigate('CommunityNav');
  getAllFreinds('1686658085577').then(res => {
    console.log('get all friends', JSON.stringify(res));
    friends.set(res.data);
    loadFriends.set(false);
  });
};

export const getGroups = async (
  navigation: NavigationProp<ParamListBase>,
  loadGroups: State<boolean, {}>,
  groups: State<Group[] | null, {}>,
) => {
  loadGroups.set(true);
  navigation.navigate('GroupsList');
  getMyGroups('1686658085577').then(res => {
    console.log('get all groups', JSON.stringify(res));
    groups.set(res.data);
    loadGroups.set(false);
  });
};
