import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useHookstate } from '@hookstate/core';

import {
  CommunityCard,
  MyCanvas,
  MyText,
  SearchBar,
  SubHeader,
  Tabs,
} from '../../../components';
import store from '../../../store/store';
import { colors } from '../../../theme';
import { getSearchedFriend } from '../utils/function';
import { AddFriend, getFriendRequests, getFriends } from '../../../utils';
import {
  acceptRequest,
  rejectRequest,
} from '../../../api/friendRequest.controller';
import { FriendRequest, User } from '../../../types';

export default function FriendsList() {
  const friendStore: any = useHookstate(store.friends);
  const friends: User[] = friendStore.get();
  const friendRequestsStore: any = useHookstate(store.friendRequests);
  const friendRequests: FriendRequest[] = friendRequestsStore.get();

  const { loadFriends, loadRequests } = useHookstate(store);
  const [searchVal, setSearchVal] = useState('');

  const clearSearch = () => {
    setSearchVal('');
    getFriends();
  };

  const acceptFriendRequest = (id: string) => {
    acceptRequest(id).then(res => {
      console.log('accept friend request', JSON.stringify(res));
      getFriendRequests();
    });
  };

  const cancelFriendRequest = (id: string) => {
    rejectRequest(id).then(res => {
      console.log('reject friend request', JSON.stringify(res));
      getFriendRequests();
    });
  };

  const checkSearchedEmail = (searchVal: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(searchVal)) {
      getSearchedFriend(searchVal);
    } else {
      console.log('Please enter a valid email');
    }
  };


  return (
    <MyCanvas>
      <SearchBar
        value={searchVal}
        placeholder="Search by email"
        onChangeText={setSearchVal}
        clearInput={clearSearch}
        onSubmitEditing={() => checkSearchedEmail(searchVal)}
      />
      <Tabs selectedTabId={1} />
      <View>
        <SubHeader title="Friend Requests" />
        {loadRequests.get() ? (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          <FlatList
            data={friendRequests}
            renderItem={({ item }) => (
              <CommunityCard
                name={item.sender?.userName as string}
                details={item.sender?.email as string}
                image={item.sender?.image as string}
                requestBtn={true}
                onRequestAccept={() => acceptFriendRequest(item.id as string)}
                onRequestCancel={() => cancelFriendRequest(item.id as string)}
              />
            )}
            ListEmptyComponent={
              <MyText
                textStyle={{ textAlign: 'center', marginTop: 10 }}
                children="No Friend Requests to Show"
              />
            }
          />
        )}
        <SubHeader title="Friends" />
        {loadFriends.get() ? (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <CommunityCard
                name={item.userName}
                details={item.email}
                image={item.image}
                addBtn={item.isFriend == false || !item.isFriend == undefined}
                onPressAddBtn={() => AddFriend(item.uid, item.email)}
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
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
