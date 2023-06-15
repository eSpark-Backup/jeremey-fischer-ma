import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  CommunityCard,
  LineSeperator,
  MyCanvas,
  SearchBar,
  SubHeader,
  Tabs,
} from '../../../components';
import {HomeNavProps} from '../../../types';

export default function FriendsList() {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  return (
    <MyCanvas>
      <SearchBar placeholder="Search by email" />
      <Tabs selectedTabId={1} />
      <SubHeader title="Friend Requests" />
      <CommunityCard
        name="John"
        details="7 Friends"
        image="https://randomuser.me/api/portraits/men/22.jpg"
        requestBtn={true}
      />
      <LineSeperator />
      <ScrollView>
        <CommunityCard
          name="John"
          details="7 Friends"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          addBtn={true}
        />
        <CommunityCard
          name="John"
          details="7 Friends"
          image="https://randomuser.me/api/portraits/men/22.jpg"
        />
      </ScrollView>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
