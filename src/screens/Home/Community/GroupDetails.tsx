import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import {
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
  MyText,
} from '../../../components';
import {
  CommunityNavProps,
  CommunityStackParamList,
  Content,
} from '../../../types';
import store from '../../../store/store';
import { colors } from '../../../theme';
import { getGroupById } from '../../../api/groups.controller';
import useUpdateEffect from '../../../utils/hooks/useUpdateEffect';

type GroupDetailsScreenRouteProps = RouteProp<
  CommunityStackParamList,
  'GroupDetails'
>;

export default function GroupDetails() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const { params } = useRoute<GroupDetailsScreenRouteProps>();
  const {
    item: { title, contents },
  } = params;

  const [groupContent, setGroupContent] = useState<Content[]>(contents!);

  useFocusEffect(
    React.useCallback(() => {
      const ids = store.archiveIds.get();
      const reduceArchived: any = contents?.filter(
        item => item.isArchived == false && !ids.includes(item.id!),
      );
      ids.map(item => item);
      setGroupContent(reduceArchived);
      store.archiveId.set(null);
    }, []),
  );

  function renderGroupFeed({ item, index }: { item: Content; index: number }) {
    return <FeedCard key={index} contentData={item} senderData={item.sender} />;
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
