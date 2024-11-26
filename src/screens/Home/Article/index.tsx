import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useHookstate } from '@hookstate/core';

import { colors } from '../../../theme';
import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import { NewsFeed } from '../../../types';
import store from '../../../store/store';
import loaders from '../../../store/loaders';

export default function ArticleScreen() {
  const [articles, setArticles] = useState<NewsFeed[]>([]);
  const articlesStore: any = useHookstate(store?.articles);
  const article = articlesStore.get();
  const loader = useHookstate(loaders.newsFeed).get();
  const flatListRef: any = useRef();
  useEffect(() => {
    if (!loader) {
      setArticles(article);
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

  console.log('articles user', articles[10]);

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
          ListEmptyComponent={<EmptyFeedLabel label="No Articles Found" />}
          ListFooterComponent={<GapView length={80} />}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
