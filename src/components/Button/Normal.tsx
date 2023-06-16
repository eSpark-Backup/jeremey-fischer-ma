import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme';
import MyText from '../MyText';

const Button = ({
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
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btnContainer,
        btnStyle,
        disabled && { opacity: 0.6 },
        icon != null && { flexDirection: 'row', paddingHorizontal: 20 },
      ]}>
      <View>
        <MyText textStyle={{ ...titleStyle }}>{title}</MyText>
      </View>
      {icon && <>{icon}</>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
});

export default Button;
