import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ImmutableObject, useHookstate } from '@hookstate/core';
import { FAB } from '@rneui/themed';

import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import { colors } from '../../../theme';
import { NewsFeed } from '../../../types';
import store from '../../../store/store';
import loaders from '../../../store/loaders';

export default function VideoScreen() {
  const [articles, setArticles] = useState<NewsFeed[]>([]);
  const videosStore: any = useHookstate(store?.videos);
  const video = videosStore.get();
  const loader = useHookstate(loaders?.newsFeed).get();
  const flatListRef: any = useRef();

  useEffect(() => {
    if (!loader) {
      // setArticles(extractFeeds(newsFeedData, 'Video'));
      setArticles(video);
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
          ref={flatListRef}
          data={articles}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Videos Found" />}
          ListFooterComponent={<GapView length={80} />}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
