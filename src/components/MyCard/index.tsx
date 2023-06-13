import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function MyCard({children}: {children?: JSX.Element}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 10,
      }}>
      {children}
    </View>
  );
}
