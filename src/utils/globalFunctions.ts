import { ImmutableArray } from '@hookstate/core';
import moment from 'moment';

import { NewsFeed } from '../types';

function extractFeeds(
  data: ImmutableArray<NewsFeed>,
  type: 'Audio' | 'Video' | 'Article' | 'Podcast',
) {
  const articles: any = data.filter(item => item.content.mediaType == type);
  return articles;
}

const transformTime = (time: number) => {
  const spilted = moment.unix(time).utc(false).fromNow(true).split(' ');
  const suffix = spilted[1].charAt(0);
  return spilted[0] + suffix;
};

export { extractFeeds, transformTime };
