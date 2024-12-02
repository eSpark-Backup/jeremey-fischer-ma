import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useHookstate } from '@hookstate/core';

import { colors } from '../theme';
import { EmptyFeedLabel, FeedCard, GapView, MyCanvas } from '../components';
import { NewsFeed, Content } from '../types';
import store from '../store/store';
import loaders from '../store/loaders';
import { useIsFocused } from '@react-navigation/native';
import { getAllGroupInboxData } from '../api/comments.controller';

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

  useEffect(() => {
    if (!loader) {
      const filteredArticles = articles.filter(
        (item: NewsFeed) =>
          !item?.content?.isCommentViewed && !item?.content?.isArchived,
      );
      setFilteredContent(filteredArticles);

      const filteredGroups = groupContent?.filter(
        (item: Content) => !item?.isCommentViewed && !item?.isArchived,
      );
      setFilteredGroupContent(filteredGroups);
    }
  }, [loader]);

  useEffect(() => {
    getAllGroupInboxData(store.userData.get()?.uid);
  }, [isFocused]);

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
      ) : combinedData.length > 0 && hasUnreadContent ? (
        <FlatList
          data={combinedData}
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
