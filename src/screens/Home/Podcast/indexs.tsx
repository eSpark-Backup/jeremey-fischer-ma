import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImmutableObject, useHookstate } from '@hookstate/core';
import { FAB } from '@rneui/themed';

import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import { colors } from '../../../theme';
import { NavProps, NewsFeed } from '../../../types';
import store from '../../../store/store';
import loaders from '../../../store/loaders';
import { extractFeeds } from '../../../utils/globalFunctions';

export default function PodcastScreen() {
  const [podcasts, setPodcasts] = useState<NewsFeed[]>([]);
  const newsFeedData = useHookstate(store?.newsFeed).get();
  const podcastsStore: any = useHookstate(store?.podcasts);
  const podcast = podcastsStore.get();
  const loader = useHookstate(loaders?.newsFeed).get();
  const navigation = useNavigation<NavProps['navigation']>();

  useEffect(() => {
    if (!loader) {
      // setPodcasts(extractFeeds(newsFeedData, 'Podcast'));
      setPodcasts(podcast);
    }
  }, [loader]);

  function renderFeed({ item, index }: { item: NewsFeed; index: number }) {
    return (
      <FeedCard
        key={index}
        contentData={item?.content}
        senderData={item?.sender}
      />
    );
  }

  return (
    <MyCanvas>
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={podcasts}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Podcasts Found" />}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
