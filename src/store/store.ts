import { hookstate } from '@hookstate/core';

const store = hookstate({
  userData: null,
  screenLoading: false,
});

export default store;
