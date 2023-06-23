import { hookstate } from '@hookstate/core';
import { GlobalState } from '../types';

const store = hookstate<GlobalState>({
  userData: null,
  screenLoading: false,
  loadFriends: false,
  friends: null,
  loadGroups: false,
  groups: null,
  loadRequests: false,
  friendRequests: null,
  newsFeed: [],
});

export default store;
