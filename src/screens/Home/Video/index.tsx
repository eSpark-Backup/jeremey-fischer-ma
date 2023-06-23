import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImmutableObject, useHookstate } from '@hookstate/core';
import { FAB } from '@rneui/themed';

import { EmptyFeedLabel, FeedCard, MyCanvas } from '../../../components';
import { colors } from '../../../theme';
import { NavProps, NewsFeed } from '../../../types';
import store from '../../../store/store';
import loaders from '../../../store/loaders';
import { extractFeeds } from '../../../utils/globalFunctions';

export default function VideoScreen() {
  const [articles, setArticles] = useState<NewsFeed[]>([]);
  const newsFeedData = useHookstate(store?.newsFeed).get();
  const loader = useHookstate(loaders?.newsFeed).get();
  const navigation = useNavigation<NavProps['navigation']>();

  useEffect(() => {
    if (!loader) {
      setArticles(extractFeeds(newsFeedData, 'Video'));
    }
  }, [loader]);

  function renderFeed({ item, index }: { item: NewsFeed; index: number }) {
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
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderFeed}
          ListEmptyComponent={<EmptyFeedLabel label="No Videos Found" />}
        />
      )}
      <FAB
        style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1 }}
        visible={true}
        icon={{ name: 'search', color: 'white' }}
        color={colors.card}
        onPress={() => navigation.navigate('Search')}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
