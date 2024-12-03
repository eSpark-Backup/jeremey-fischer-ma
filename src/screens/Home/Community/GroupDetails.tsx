import React from 'react';
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
import { getGroupContent } from '../../../utils';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const { loadGroups } = useHookstate(store);
  const groupContentStore: any = useHookstate(store.groupContent);
  const groupContent: Content[] = groupContentStore.get();
  const { groupId } = params;

  useFocusEffect(
    React.useCallback(() => {
      getGroupContent(groupId!).then(data =>
        navigation.setParams({ ...params, title: data?.groupName }),
      );
    }, []),
  );

  function renderGroupFeed({ item, index }: { item: Content; index: number }) {
    return (
      <FeedCard key={item.id} groupId={groupId} contentData={item} senderData={item?.sender} />
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
