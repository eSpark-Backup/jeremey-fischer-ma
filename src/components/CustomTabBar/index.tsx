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
import { getFriends } from '../../screens/Home/utils/function';
import { useHookstate } from '@hookstate/core';
import store from '../../store/store';

const CustomTabBar = ({
  state,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase>;
}) => {
  const { friends, loadFriends } = useHookstate(store);
  console.log('state', state);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Avatar
        onPress={() => navigation.navigate('ProfileNav')}
        rounded
        containerStyle={{
          borderWidth: 2,
          borderColor: colors.primary,
          marginHorizontal: 5,
          width: 35,
          height: 35,
        }}
        source={{
          uri: 'https://randomuser.me/api/portraits/men/36.jpg',
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[0].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 0 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <ArticleSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[1].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 1 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <MusicNoteSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[2].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 2 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <MicNoneSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(state.routes[3].name)}
          style={{
            borderBottomWidth: 3,
            borderBottomColor:
              state.index == 3 ? colors.primary : 'transparent',
            paddingVertical: 8,
            marginHorizontal: 10,
          }}>
          <TvSvg color={'#fff'} width={35} height={35} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => getFriends(navigation, loadFriends, friends)}
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
