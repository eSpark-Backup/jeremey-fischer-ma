import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Dot({show = false}: {show?: boolean}) {
  const {colors} = useTheme();
  return show ? (
    <View
      style={{
        backgroundColor: colors.primary,
        borderWidth: 1.2,
        borderRadius: 50,
        width: 20,
        height: 20,
      }}
    />
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({});
