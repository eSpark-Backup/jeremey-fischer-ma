import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';

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
import MyText from '../MyText';

const CustomTabBar = ({
  state,
  navigation,
  onPress,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
  onPress?: () => void;
}) => {
  const userData = useHookstate(store?.userData)?.get();
  const friendRequest = useHookstate(store.friendRequests).get();
  const groups = useHookstate(store.groups).get();
  const groupsContent = useHookstate(store.groupContent).get();
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
            value?.contents[index].senderId != userData?.uid
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
    if (!value?.content.isViewed && value?.content.senderId != userData?.uid) {
      isNewContent = true;
    }
    return isNewContent;
  });
  const isAnyAudioUpdate = audios?.some(value => {
    let isNewContent = false;
    if (!value?.content.isViewed && value?.content.senderId != userData?.uid) {
      isNewContent = true;
    }
    return isNewContent;
  });

  const isAnyGroupUpdate = groupsContent?.some(group => {
    let isNewContent = false;
    if (groupsContent) {
      for (let index = 0; index < groupsContent.length; index++) {
        if (groupsContent[index]?.isCommentViewed === false) {
          isNewContent = true;
          break;
        }
      }
    }
    return isNewContent;
  });

  const isAnyPodcastUpdate = podcasts?.some(value => {
    let isNewContent = false;
    if (!value?.content.isViewed && value?.content.senderId != userData?.uid) {
      isNewContent = true;
    }
    return isNewContent;
  });
  const isAnyVideoUpdate = videos?.some(value => {
    let isNewContent = false;
    if (!value?.content.isViewed && value?.content.senderId != userData?.uid) {
      isNewContent = true;
    }
    return isNewContent;
  });

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Avatar
          onPress={() => navigation.navigate('ProfileNav')}
          rounded
          containerStyle={{
            marginHorizontal: 5,
            width: 35,
            height: 35,
            backgroundColor: userData?.image ? undefined : colors.primary,
          }}
          source={{
            uri: userData?.image ? userData?.image : undefined,
          }}
          title={
            userData?.image
              ? undefined
              : userData?.userName?.charAt(0)?.toUpperCase()
          }
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <MyText
            textStyle={{ fontSize: 30, marginLeft: 12 }}
            children={'Contents'}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Inbox')}
            style={{
              paddingVertical: 8,
              marginHorizontal: 5,
              alignSelf: 'center',
              position: 'relative',
            }}>
            {(Boolean(groupsContent?.length)) && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 100,
                  position: 'absolute',
                  right: -10,
                  top: 5,
                  zIndex: 1,
                }}
              />
            )}

            <Icon
              name="paper-plane"
              type="font-awesome"
              color="#fff"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={getNavigate}
            style={{
              paddingVertical: 8,
              marginHorizontal: 5,
              alignSelf: 'center',
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
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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

        {/* Podcast Tab */}
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

        {/* Video Tab */}
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
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
