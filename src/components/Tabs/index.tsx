import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../theme';
import MyText from '../MyText';
import {HomeNavProps} from '../../types';

export default function Tabs({
  selectedTabId,
}: {
  selectedTabId: string | number;
}) {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '80%',
        height: 50,
        marginVertical: 10,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
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
        onPress={() => navigation.navigate('GroupsList')}
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
