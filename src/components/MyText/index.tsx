import React from 'react';
import {StyleSheet, Text, View, Platform, TextStyle} from 'react-native';

export default function MyText({
  children,
  textStyle,
}: {
  children: string;
  textStyle?: TextStyle;
}) {
  return (
    <Text style={{...styles.text, ...textStyle}} numberOfLines={3}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS == 'ios' ? 'Chalkduster' : 'sans-serif-medium',
  },
});
