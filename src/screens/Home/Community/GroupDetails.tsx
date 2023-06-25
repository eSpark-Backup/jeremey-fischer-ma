import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { FeedCard, MyCanvas } from '../../../components';
import { CommunityStackParamList, Content } from '../../../types';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const {
    item: { contents },
  } = params;

  function renderGroupFeed({ item, index }: { item: Content; index: number }) {
    return <FeedCard key={index} contentData={item} senderData={item.sender} />;
  }

  return (
    <MyCanvas>
      <FlatList data={contents} renderItem={renderGroupFeed} />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
