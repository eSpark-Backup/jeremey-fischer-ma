import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  CommunityCard,
  LineSeperator,
  MyCanvas,
  MyText,
  SearchBar,
  SubHeader,
  Tabs,
} from '../../../components';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';

export default function FriendsList() {
  const { friends, loadFriends } = useHookstate(store);

  return (
    <MyCanvas>
      <SearchBar placeholder="Search by email" />
      <Tabs selectedTabId={1} />
      <SubHeader title="Friend Requests" />
      <CommunityCard
        name="John"
        details="john@email.com"
        image="https://randomuser.me/api/portraits/men/22.jpg"
        requestBtn={true}
      />
      <SubHeader title="Friends" />
      {loadFriends.get() ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={friends.get()}
          renderItem={({ item }) => (
            <CommunityCard
              name={item.userName}
              details={item.email}
              image={'https://randomuser.me/api/portraits/men/22.jpg'}
            />
          )}
          ListEmptyComponent={
            <MyText
              textStyle={{ textAlign: 'center', marginTop: 10 }}
              children="No Friends to Show"
            />
          }
        />
      )}
      {/* <ScrollView>
        <CommunityCard
          name="John"
          details="john@email.com"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          addBtn={true}
        />
        <CommunityCard
          name="John"
          details="john@email.com"
          image="https://randomuser.me/api/portraits/men/22.jpg"
        />
      </ScrollView> */}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
