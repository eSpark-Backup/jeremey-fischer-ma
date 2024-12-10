import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useHookstate } from '@hookstate/core';

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

export default function AudioScreen() {
  const [audios, setAudios] = useState<NewsFeed[]>([]);
  const audiosStore: any = useHookstate(store?.audios);
  const audio = audiosStore.get();
  const loader = useHookstate(loaders.newsFeed).get();
  const flatListRef: any = useRef();
  useEffect(() => {
    if (!loader) {
      // setAudios(extractFeeds(newsFeedData, 'Audio'));
      setAudios(audio);
    }
  }, [loader]);

  function renderFeed({ item, index }: { item: NewsFeed; index: number }) {
    return (
      <FeedCard
        key={index}
        contentData={item?.content}
        senderData={item?.sender}
        recieverData={item.receiver}
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
          data={audios}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Music Found" />}
          ListFooterComponent={<GapView length={80} />}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
