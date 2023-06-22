import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../theme';
import MyText from '../MyText';
import { HomeNavProps } from '../../types';
import { getGroups } from '../../screens/Home/utils/function';
import { useHookstate } from '@hookstate/core';
import store from '../../store/store';

export default function Tabs({
  selectedTabId,
}: {
  selectedTabId: string | number;
}) {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  const { groups, loadGroups } = useHookstate(store);

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
        onPress={() => navigation.navigate('FriendsList')}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: selectedTabId == 1 ? colors.background : colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText children="Friends" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getGroups(navigation, loadGroups, groups)}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: selectedTabId == 2 ? colors.background : colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText children="Groups" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
