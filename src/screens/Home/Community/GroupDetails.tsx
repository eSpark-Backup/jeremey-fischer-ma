import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { FeedCard, GapView, MyCanvas } from '../../../components';
import {
  CommunityNavProps,
  CommunityStackParamList,
  NewsFeed,
} from '../../../types';
import CommunityNav from '../../../navigation/CommunityNav';
import loaders from '../../../store/loaders';
import store from '../../../store/store';
import { useHookstate } from '@hookstate/core';
import { extractFeeds } from '../../../utils/globalFunctions';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const newsFeedData = useHookstate(store?.newsFeed).get();
  const loader = useHookstate(loaders.newsFeed).get();
  const [groupContent, setGroupContent] = useState<NewsFeed[]>([]);
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const {
    item: { title, content },
  } = params;

  useEffect(() => {
    if (!loader) {
      setGroupContent(extractFeeds(newsFeedData, 'Article'));
    }
  }, [loader]);

  function renderGroupFeed({ item, index }: { item: NewsFeed; index: number }) {
    return (
      <FeedCard
        key={index}
        contentData={item.content}
        senderData={item.sender}
      />
    );
  }

  return (
    <MyCanvas>
      <FlatList data={groupContent} renderItem={renderGroupFeed} />
      {/* <ScrollView>
        <FeedCard
          date="today"
          image={'https://randomuser.me/api/portraits/men/22.jpg'}
          time={'3h'}
        />
        <GapView />
        <FeedCard
          date="yesterday"
          image={'https://randomuser.me/api/portraits/men/21.jpg'}
          time={'2h'}
        />
        <GapView />
        <FeedCard
          image={'https://randomuser.me/api/portraits/men/20.jpg'}
          time={'2h'}
        />
      </ScrollView> */}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
