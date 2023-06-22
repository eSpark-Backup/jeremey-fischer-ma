import { hookstate } from '@hookstate/core';
import { GlobalState, User } from '../types';

const store = hookstate<GlobalState>({
  userData: null,
  screenLoading: false,
  loadFriends: false,
  friends: null,
  loadGroups: false,
  groups: null,
});

export default store;
