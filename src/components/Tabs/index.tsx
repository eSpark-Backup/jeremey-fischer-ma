import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { colors } from '../../theme';
import MyText from '../MyText';
import { Group } from '../../types';
import store from '../../store/store';
import { getFriendRequests, getFriends, getGroups } from '../../utils';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { useHookstate } from '@hookstate/core';

export default function Tabs({
  state,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
  updateTab?: (index: number) => void;
}) {
  const friendRequestStore: any = useHookstate(store.friendRequests);
  const friendRequest = friendRequestStore.get();
  const groupsStore: any = useHookstate(store.groups);
  const groups = groupsStore.get();

  const navigateToGroups = () => {
    getGroups();
    navigation.navigate('GroupsTab');
  };

  const navigateToFriends = () => {
    getFriends();
    getFriendRequests();
    navigation.navigate('FriendsTab');
  };

  const isAnyNewUpdate = groups?.some((value: Group) => {
    let isNewContent = false;
    if (value?.contents?.length) {
      for (
        let index = 0;
        index < (value?.contents ? value?.contents.length : 0);
        index++
      ) {
        if (
          value?.contents[index].isViewed == false &&
          value?.contents[index].senderId != store.userData.get()?.uid
        ) {
          isNewContent = true;
          break;
        }
      }
    }
    return isNewContent;
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '80%',
        height: 50,
        marginVertical: 10,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
      }}>
      <TouchableOpacity
        onPress={navigateToFriends}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: state.index == 0 ? colors.background : colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {Boolean(friendRequest?.length) && (
          <View
            style={{
              height: 18,
              width: 18,
              backgroundColor: colors.primary,
              borderRadius: 100,
              position: 'absolute',
              left: -5,
              top: -4,
              // zIndex: 1,X
              alignItems: 'center',
            }}>
            <MyText
              children={friendRequest?.length?.toString()}
              textStyle={{ fontSize: 12, fontWeight: 'bold' }}
            />
          </View>
        )}
        <MyText children="Friends" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToGroups}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: state.index == 1 ? colors.background : colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isAnyNewUpdate && (
          <View
            style={{
              height: 18,
              width: 18,
              backgroundColor: colors.primary,
              borderRadius: 100,
              position: 'absolute',
              right: -5,
              top: -4,
              alignItems: 'center',
            }}
          />
        )}
        <MyText children="Groups" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
