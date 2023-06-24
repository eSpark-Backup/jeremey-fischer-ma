import { hookstate } from '@hookstate/core';

type Loaders = {
  newsFeed: boolean;
  archive: boolean;
  contentDetails: boolean;
};

const loaders = hookstate<Loaders>({
  newsFeed: false,
  archive: false,
  contentDetails: false,
});

export default loaders;
