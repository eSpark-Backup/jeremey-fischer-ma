import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import { colors } from '../../theme';

export default function ScreenLoader({ show }: { show: boolean }) {
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000044',
    position: 'absolute',
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
