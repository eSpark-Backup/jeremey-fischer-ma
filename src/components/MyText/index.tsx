import React from 'react';
import { StyleSheet, Text, View, Platform, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MyText({
  children,
  textStyle,
  lines = 3,
}: {
  children?: string | string[];
  textStyle?: TextStyle;
  lines?: number;
}) {
  const { colors } = useTheme();

  return (
    <Text
      style={{ ...styles.text, ...textStyle, color: colors.text }}
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
