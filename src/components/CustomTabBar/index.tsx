import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';

import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  ArticleSvg,
  GroupSvg,
  MicNoneSvg,
  MusicNoteSvg,
  TvSvg,
} from '../../assets';

import { colors } from '../../theme';
import { useHookstate } from '@hookstate/core';
import store from '../../store/store';
import { getFriendRequests, getFriends, getGroups } from '../../utils';

const CustomTabBar = ({
  state,
  navigation,
  onPress,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
  onPress?: () => void;
}) => {
  const friendRequest = useHookstate(store.friendRequests).get();
  const groups = useHookstate(store.groups).get();
  const articles = useHookstate(store.articles).get();
  const audios = useHookstate(store.audios).get();
  const podcasts = useHookstate(store.podcasts).get();
  const videos = useHookstate(store.videos).get();

  useEffect(() => {
    getGroups();
    getFriendRequests();
  }, []);

  const getNavigate = () => {
    getFriends();
    getFriendRequests();
    navigation.navigate('CommunityNav');
  };

  const isAnyNewUpdate =
    Boolean(friendRequest?.length) ||
    groups?.some(value => {
      let isNewContent = false;
      if (value?.contents) {
        for (
          let index = 0;
          index < (value?.contents ? value?.contents.length : 0);
          index++
        ) {
          if (
            !value?.contents[index].isViewed &&
            value?.contents[index].senderId != store.userData.get()?.uid
          ) {
            isNewContent = true;
            break;
          }
        }
      }
      return isNewContent;
    });

  const isAnyArticleUpdate = articles?.some(value => {
    let isNewContent = false;
    if (
      !value?.content.isViewed &&
      value?.content.senderId != store.userData.get()?.uid
    ) {
      isNewContent = true;
    }
    return isNewContent;
  });
  const isAnyAudioUpdate = audios?.some(value => {
    let isNewContent = false;
    if (
      !value?.content.isViewed &&
      value?.content.senderId != store.userData.get()?.uid
    ) {
      isNewContent = true;
    }
    return isNewContent;
  });
  const isAnyPodcastUpdate = podcasts?.some(value => {
    let isNewContent = false;
    if (
      !value?.content.isViewed &&
      value?.content.senderId != store.userData.get()?.uid
    ) {
      isNewContent = true;
    }
    return isNewContent;
  });
  const isAnyVideoUpdate = videos?.some(value => {
    let isNewContent = false;
    if (
      !value?.content.isViewed &&
      value?.content.senderId != store.userData.get()?.uid
    ) {
      isNewContent = true;
    }
    return isNewContent;
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}>
      <Avatar
        onPress={() => navigation.navigate('ProfileNav')}
        rounded
        containerStyle={{
          marginHorizontal: 5,
          width: 35,
          height: 35,
        }}
        source={{
          uri:
            store.userData.get()?.userName == ''
              ? 'https://randomuser.me/api/portraits/men/36.jpg'
              : store.userData.get()?.image,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            navigation.navigate(state.routes[0].name);
          }}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 0 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          {isAnyArticleUpdate && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
                borderRadius: 100,
                position: 'absolute',
                right: -1,
                top: 8,
                zIndex: 1,
              }}
            />
          )}
          <ArticleSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            navigation.navigate(state.routes[1].name);
          }}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 1 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          {isAnyAudioUpdate && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
                borderRadius: 100,
                position: 'absolute',
                right: 2,
                top: 8,
                zIndex: 1,
              }}
            />
          )}
          <MusicNoteSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            navigation.navigate(state.routes[2].name);
          }}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 2 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          {isAnyPodcastUpdate && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
                borderRadius: 100,
                position: 'absolute',
                right: 2,
                top: 8,
                zIndex: 1,
              }}
            />
          )}
          <MicNoneSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            navigation.navigate(state.routes[3].name);
          }}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 3 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          {isAnyVideoUpdate && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
                borderRadius: 100,
                position: 'absolute',
                right: -2,
                top: 8,
                zIndex: 1,
              }}
            />
          )}
          <TvSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={getNavigate}
        style={{
          paddingVertical: 8,
          marginHorizontal: 5,
        }}>
        {isAnyNewUpdate && (
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: colors.primary,
              borderRadius: 100,
              position: 'absolute',
              right: 2,
              top: 8,
              zIndex: 1,
            }}
          />
        )}
        <GroupSvg color={'#fff'} width={35} height={35} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
