import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';

export default function ScreenLoader({show}: {show: boolean}) {
  const {colors} = useTheme();
  return (
    show ? <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
    : null
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
});
