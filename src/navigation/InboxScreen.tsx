import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Platform } from 'react-native';
import { useHookstate } from '@hookstate/core';

import { colors } from '../theme';
import { EmptyFeedLabel, FeedCard, GapView, MyCanvas } from '../components';
import { NewsFeed, Content } from '../types';
import store from '../store/store';
import loaders from '../store/loaders';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function InboxScreen() {
  const [filteredContent, setFilteredContent] = useState<NewsFeed[]>([]);
  const [filteredGroupContent, setFilteredGroupContent] = useState<Content[]>(
    [],
  );

  const articlesStore: any = useHookstate(store?.articles);
  const groupContentStore: any = useHookstate(store?.groupContent);

  const articles = articlesStore.get();
  const groupContent = groupContentStore.get();
  const isFocused = useIsFocused();

  const loader = useHookstate(loaders.newsFeed).get();

  useFocusEffect(
    React.useCallback(() => {
      loaders.newsFeed.set(false);
      const filteredArticles = articles.filter(
        (item: NewsFeed) =>
          !item?.content?.isCommentViewed && !item?.content?.isArchived,
      );
      setFilteredContent(filteredArticles);
      const filteredGroups = groupContent?.filter(
        (item: Content) => !item?.isCommentViewed && !item?.isArchived,
      );
      setFilteredGroupContent(filteredGroups);
      return () => {
        loaders.newsFeed.set(true);
        setFilteredContent([]);
        setFilteredGroupContent([]);
      };
    }, []),
  );

  function isNewsFeed(item: NewsFeed | Content): item is NewsFeed {
    return (item as NewsFeed).content !== undefined;
  }

  function renderFeed({
    item,
    index,
  }: {
    item: NewsFeed | Content;
    index: number;
  }) {
    const isNews = isNewsFeed(item);
    return (
      <FeedCard
        key={index}
        contentData={isNews ? item.content : item}
        senderData={(item as NewsFeed)?.sender || null}
        unreadComments={
          isNews ? item.content.isCommentViewed : item.isCommentViewed
        }
        recieverData={(item as NewsFeed)?.receiver || undefined}
      />
    );
  }

  const hasUnreadContent =
    filteredContent?.some(item => !item?.content?.isCommentViewed) ||
    filteredGroupContent?.some(item => !item?.isCommentViewed);

  const combinedData = [
    ...(filteredContent || []),
    ...(filteredGroupContent || []),
  ];

  return (
    <MyCanvas>
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : groupContent?.length > 0 ? (
        <FlatList
          data={groupContent ?? []}
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
