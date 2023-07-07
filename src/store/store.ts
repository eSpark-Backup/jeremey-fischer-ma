import { hookstate } from '@hookstate/core';
import { GlobalState } from '../types';

const store = hookstate<GlobalState>({
  userData: null,
  screenLoading: false,
  loadFriends: false,
  friends: [],
  loadGroups: false,
  userGroups: [],
  groups: [],
  loadRequests: false,
  friendRequests: [],
  newsFeed: [],
  archives: [],
  archiveIds: [],
  currentUserNotificationSetting: null,
});

export default store;
