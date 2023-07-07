import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Dot({ show = false }: { show?: boolean }) {
  const { colors } = useTheme();
  return show ? (
    <View
      style={{
        backgroundColor: '#1284fa',
        borderRadius: 50,
        width: 12,
        height: 12,
      }}
    />
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({});
