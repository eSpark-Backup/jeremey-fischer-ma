import { ImmutableArray } from '@hookstate/core';
import moment from 'moment';

import { NewsFeed } from '../types';

function extractFeeds(
  data: ImmutableArray<NewsFeed>,
  type: 'Audio' | 'Video' | 'Article' | 'Podcast',
) {
  const media: ImmutableArray<NewsFeed> = data.filter(
    item => item.content.mediaType == type,
  );
  const reduceArchived: any = media.filter(
    item => item.content.isArchived == false,
  );
  return reduceArchived;
}

function extractFeedsByUser(
  data: ImmutableArray<NewsFeed>,
  uid: string,
  toggle: boolean,
) {
  const result: any = data.filter(item => item.content.senderId == uid);
  const final: NewsFeed[] = result.filter(
    (item: any) => item.content.isViewed !== toggle,
  );
  return final;
}

function toggleViewed(
  data: ImmutableArray<NewsFeed>,
  uid: string,
  unRead?: boolean,
) {
  const temp: any = data.filter(item => item.content.senderId == uid);
  const result: any = temp.filter(
    (item: any) => item.content.isViewed == unRead,
  );
  return result;
}

const transformTime = (time: number) => {
  const splited = moment.unix(time).utc(false).fromNow(true).split(' ');
  const suffix =
    splited.length < 2 ? splited[2].charAt(0) : splited[1].charAt(0);
  const prefix = splited[0] == 'a' || splited[0] == 'an' ? '1' : splited[0];
  return prefix + suffix;
};

export { extractFeeds, transformTime, extractFeedsByUser, toggleViewed };
