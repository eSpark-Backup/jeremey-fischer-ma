import React, { useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import {
  CommunityNavProps,
  CommunityStackParamList,
  Content,
} from '../../../types';
import store from '../../../store/store';
import { colors } from '../../../theme';

import { useHookstate } from '@hookstate/core';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const { loadGroups } = useHookstate(store);
  const {
    item: { title, contents },
  } = params;

  const [groupContent, setGroupContent] = useState<Content[]>(contents!);

  useFocusEffect(
    React.useCallback(() => {
      const ids = store.archiveIds.get();
      const reduceArchived: any = contents?.filter(
        item => item?.isArchived == false && !ids.includes(item?.id!),
      );
      ids.map(item => item);
      setGroupContent(reduceArchived);
    }, []),
  );

  function renderGroupFeed({ item, index }: { item: Content; index: number }) {
    return (
      <FeedCard key={item.id} contentData={item} senderData={item?.sender} />
    );
  }

  return (
    <MyCanvas>
      {loadGroups.get() ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <FlatList
          data={groupContent}
          renderItem={renderGroupFeed}
          ListEmptyComponent={<EmptyFeedLabel label="No Group Content Found" />}
          ItemSeparatorComponent={() => <GapView />}
        />
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
