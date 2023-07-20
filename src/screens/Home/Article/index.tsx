import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import { colors } from '../../../theme';
import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import { NavProps, NewsFeed } from '../../../types';
import store from '../../../store/store';
import loaders from '../../../store/loaders';
import { handleInfinityScroll } from '../utils/function';

export default function ArticleScreen() {
  const [articles, setArticles] = useState<NewsFeed[]>([]);
  const articlesStore: any = useHookstate(store?.articles);
  const article = articlesStore.get();
  const loader = useHookstate(loaders.newsFeed).get();
  const navigation = useNavigation<NavProps['navigation']>();
  const flatListRef: any = useRef();
  useEffect(() => {
    if (!loader) {
      setArticles(article);
    }
  }, [loader]);

  useFocusEffect(
    React.useCallback(() => {
      if (articles.length > 1) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
      if (articles.length == 4) {
        store.hideSearchFAB.set(true);
      } else {
        store.hideSearchFAB.set(false);
      }
    }, [articles]),
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
          data={articles}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Articles Found" />}
          onScroll={({ nativeEvent }) => {
            if (handleInfinityScroll(nativeEvent) && articles.length > 0) {
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
