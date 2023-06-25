import { hookstate } from '@hookstate/core';

type Loaders = {
  newsFeed: boolean;
  friend: boolean;
  createGroup: boolean;
  archive: boolean;
  contentDetails: boolean;
};

const loaders = hookstate<Loaders>({
  newsFeed: false,
  friend: false,
  createGroup: false,
  archive: false,
  contentDetails: false,
});

export default loaders;
