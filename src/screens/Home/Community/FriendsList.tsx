import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  CommunityCard,
  MyCanvas,
  MyText,
  SearchBar,
  SubHeader,
  Tabs,
} from '../../../components';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';
import { getSearchedFriend } from '../utils/function';
import { AddFriend, getFriends } from '../../../utils';

export default function FriendsList() {
  const { friends, loadFriends, friendRequests, loadRequests } =
    useHookstate(store);
  const [searchVal, setSearchVal] = useState('');

  const clearSearch = () => {
    setSearchVal('');
    getFriends(loadFriends, friends);
  };

  return (
    <MyCanvas>
      <SearchBar
        value={searchVal}
        placeholder="Search by email"
        onChangeText={setSearchVal}
        clearInput={clearSearch}
        onSubmitEditing={() =>
          getSearchedFriend(searchVal, loadFriends, friends)
        }
      />
      <Tabs selectedTabId={1} />
      <SubHeader title="Friend Requests" />
      <CommunityCard
        name="John"
        details="john@email.com"
        image="https://randomuser.me/api/portraits/men/22.jpg"
        requestBtn={true}
      />
      {/* {loadRequests.get() ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={friendRequests.get()}
          renderItem={({ item }) => (
            <CommunityCard
              name={item.userName}
              details={item.email}
              image={'https://randomuser.me/api/portraits/men/22.jpg'}
              addBtn={!item.isFriend}
              onPressAddBtn={AddFriend}
            />
          )}
          ListEmptyComponent={
            <MyText
              textStyle={{ textAlign: 'center', marginTop: 10 }}
              children="No Friends to Show"
            />
          }
        />
      )} */}
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
              addBtn={item.isFriend == false || !item.isFriend == undefined}
              onPressAddBtn={AddFriend}
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
