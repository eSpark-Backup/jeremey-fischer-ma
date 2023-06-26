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

function extractFeedsByUser(data: ImmutableArray<NewsFeed>, uid: string) {
  const result: any = data.filter(item => item.content.senderId == uid);
  return result;
}

const transformTime = (time: number) => {
  const splited = moment.unix(time).utc(false).fromNow(true).split(' ');
  const suffix =
    splited.length < 2 ? splited[2].charAt(0) : splited[1].charAt(0);
  const prefix = splited[0] == 'a' || 'an' ? '1' : splited[0];
  return prefix + suffix;
};

export { extractFeeds, transformTime, extractFeedsByUser };
