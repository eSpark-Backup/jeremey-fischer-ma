import {
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { State } from '@hookstate/core';

import { Group, HomeStackParamList, User } from '../../../types';
import {
  getAllFreinds,
  loginUser,
  searchUser,
} from '../../../api/user.controller';
import { storeUserData } from '../../../utils';
import { getMyGroups } from '../../../api/groups.controller';
import store from '../../../store/store';

export const getSearchedFriend = async (
  searchVal: string,
  loadFriends: State<boolean, {}>,
  friends: State<User[] | null, {}>,
) => {
  loadFriends.set(true);
  searchUser(searchVal, '', '1686658085577').then(res => {
    console.log('get searched friend', JSON.stringify(res));
    friends.set(res.data);
    loadFriends.set(false);
  });
};

export const getGroups = async (uid: string = '1686658085577') => {
  store.loadGroups.set(true);
  // navigation.navigate('GroupsList');
  getMyGroups(uid).then(res => {
    // console.log('get all groups', JSON.stringify(res));
    store.groups.set(res.data);
    store.loadGroups.set(false);
  });
};
