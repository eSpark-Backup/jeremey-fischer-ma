import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useHookstate } from '@hookstate/core';

import { colors } from '../theme';
import { EmptyFeedLabel, FeedCard, GapView, MyCanvas } from '../components';
import { NewsFeed } from '../types';
import store from '../store/store';
import loaders from '../store/loaders';

export default function InboxScreen() {
  const [articles, setArticles] = useState<NewsFeed[]>([]);
  const articlesStore: any = useHookstate(store?.articles);
  const article = articlesStore.get();
  const loader = useHookstate(loaders.newsFeed).get();
  const flatListRef: any = useRef();

  useEffect(() => {
    if (!loader) {
      const filteredArticles = article.filter(
        (item: NewsFeed) =>
          !item?.content?.isCommentViewed && !item?.content?.isArchived,
      );
      setArticles(filteredArticles);
    }
  }, [loader]);

  function renderFeed({ item, index }: { item: NewsFeed; index: number }) {
    return (
      <FeedCard
        key={index}
        contentData={item?.content}
        senderData={item?.sender}
        unreadComments={item?.content.isCommentViewed}
      />
    );
  }

  const hasUnreadComments = articles.some(
    item => !item?.content?.isCommentViewed,
  );

  return (
    <MyCanvas>
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : articles.length > 0 && hasUnreadComments ? (
        <FlatList
          ref={flatListRef}
          data={articles}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListFooterComponent={<GapView length={80} />}
        />
      ) : (
        <EmptyFeedLabel label="No Inbox Data Found" />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
