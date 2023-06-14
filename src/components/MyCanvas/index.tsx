import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

export default function MyCanvas({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={{...styles.container, ...style}}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
