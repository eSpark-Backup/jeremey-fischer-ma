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
import { handleInfinityScroll } from '../utils/function';
import { useFocusEffect } from '@react-navigation/native';

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

  useFocusEffect(
    React.useCallback(() => {
      if (audios.length > 1) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
      if (audios.length == 4) {
        store.hideSearchFAB.set(true);
      } else {
        store.hideSearchFAB.set(false);
      }
    }, [audios]),
  );

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
          data={audios}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Music Found" />}
          onScroll={({ nativeEvent }) => {
            if (handleInfinityScroll(nativeEvent) && audios.length > 0) {
              store.hideSearchFAB.set(true);
            } else {
              store.hideSearchFAB.set(false);
            }
          }}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
