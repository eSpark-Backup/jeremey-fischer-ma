import { hookstate } from '@hookstate/core';

const store = hookstate({
  userData: null,
  screenLoading: false,
  loadFriends: false,
  friends: null,
  loadGroups: false,
  groups: null,
});

export default store;
