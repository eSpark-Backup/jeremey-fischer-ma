import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../theme';
import MyText from '../MyText';
import { CommunityNavProps } from '../../types';
import store from '../../store/store';
import { getFriendRequests, getFriends, getGroups } from '../../utils';

export default function Tabs({
  selectedTabId,
}: {
  selectedTabId: string | number;
}) {
  const navigation = useNavigation<CommunityNavProps['navigation']>();

  const friendRequest = store.friendRequests.get();
  const groups = store.groups.get();

  const navigateToGroups = () => {
    getGroups();
    navigation.navigate('GroupsList');
  };

  const navigateToFriends = () => {
    getFriends();
    getFriendRequests();
    navigation.navigate('FriendsList');
  };

  const isAnyNewUpdate = groups?.some(value => {
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

  // console.log("groups", JSON.stringify(groups));

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
          backgroundColor: selectedTabId == 1 ? colors.background : colors.card,
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
          backgroundColor: selectedTabId == 2 ? colors.background : colors.card,
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
