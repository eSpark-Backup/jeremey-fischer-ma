import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
} from '../../../components';
import { CommunityStackParamList, Content } from '../../../types';
import { extractFeeds } from '../../../utils/globalFunctions';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const {
    item: { contents },
  } = params;

  const [groupContent, setGroupContent] = useState<Content[]>([]);

  useEffect(() => {
    console.log('useEfff');

    const reduceArchived: any = contents?.filter(
      item => item.isArchived == false,
    );
    setGroupContent(reduceArchived);
  }, []);

  function renderGroupFeed({ item, index }: { item: Content; index: number }) {
    return (
      <FeedCard key={index} contentData={item} senderData={item?.sender} />
    );
  }

  return (
    <MyCanvas>
      <FlatList
        data={groupContent}
        renderItem={renderGroupFeed}
        ListEmptyComponent={<EmptyFeedLabel label="No Group Content Found" />}
        ItemSeparatorComponent={() => <GapView />}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
