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

export default function AudioScreen() {
  const newsFeedData = useHookstate(store?.newsFeed).get();
  const [audios, setAudios] = useState<NewsFeed[]>([]);
  const loader = useHookstate(loaders.newsFeed).get();
  const navigation = useNavigation<NavProps['navigation']>();

  useEffect(() => {
    if (!loader) {
      console.log('audios', extractFeeds(newsFeedData, 'Audio'));
      setAudios(extractFeeds(newsFeedData, 'Audio'));
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
          data={audios}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Audios Found" />}
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
