import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useHookstate } from '@hookstate/core';

import { CommunityCard, MyText, SubHeader } from '../../../components';
import store from '../../../store/store';
import { colors } from '../../../theme';
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

  const acceptFriendRequest = (id: string) => {
    loadRequests.set(true);
    acceptRequest(id, store.userData.get()?.userName).then(res => {
      getFriends();
      getFriendRequests();
    });
  };

  const cancelFriendRequest = (id: string) => {
    loadRequests.set(true);
    rejectRequest(id, store.userData.get()?.userName).then(res => {
      getFriendRequests();
    });
  };

  return (
    <View style={{ flex: 1 }}>
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
                key={item.id}
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
      </View>
      <SubHeader title="Friends" />
      <View style={{ flex: 1 }}>
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
                key={item.uid}
                name={item.userName}
                details={item.email}
                image={item.image}
                requested={item.isRequested}
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
    </View>
  );
}

const styles = StyleSheet.create({});
