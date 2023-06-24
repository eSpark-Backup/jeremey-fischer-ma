import { hookstate } from '@hookstate/core';

type Loaders = {
  newsFeed: boolean;
};

const loaders = hookstate<Loaders>({
  newsFeed: false,
});

export default loaders;
