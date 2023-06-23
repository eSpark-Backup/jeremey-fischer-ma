import React from 'react';
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
import { getFriendRequests, getFriends } from '../../utils';

const CustomTabBar = ({
  state,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
}) => {
  const getNavigate = () => {
    getFriends();
    getFriendRequests();
    navigation.navigate('CommunityNav');
  };

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
          onPress={() => navigation.navigate(state.routes[0].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor: state.index == 0 ? 'grey' : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <ArticleSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[1].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor: state.index == 1 ? 'grey' : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <MusicNoteSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[2].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor: state.index == 2 ? 'grey' : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <MicNoneSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[3].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor: state.index == 3 ? 'grey' : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <TvSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={getNavigate}
        style={{
          paddingVertical: 8,
          marginHorizontal: 5,
        }}>
        <GroupSvg color={'#fff'} width={35} height={35} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
