import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../../theme';

export default function Outline({
  btnStyle = {},
  titleStyle = {},
  title = 'Title',
  disabled = false,
  icon = null,
  onPress,
}: {
  btnStyle?: ViewStyle;
  titleStyle?: TextStyle;
  title?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.btnContainer, btnStyle, disabled && {opacity: 0.6}]}>
      <View>
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleStyle: {color: '#fff'},
  btnContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
