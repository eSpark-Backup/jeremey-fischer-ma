import { hookstate } from '@hookstate/core';

type Loaders = {
  newsFeed: boolean;
  friend: boolean;
  createGroup: boolean;
};

const loaders = hookstate<Loaders>({
  newsFeed: false,
  friend: false,
  createGroup: false,
});

export default loaders;
