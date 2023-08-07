import React from 'react';
import { StyleSheet, Text, View, Platform, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MyText({
  children,
  textStyle,
  lines = 3,
  selectable,
}: {
  children?: string | string[];
  textStyle?: TextStyle;
  lines?: number;
  selectable?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <Text
      selectable={selectable}
      style={{ ...styles.text, color: colors.text, ...textStyle }}
      numberOfLines={lines}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans-Regular',
  },
});
