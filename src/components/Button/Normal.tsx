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

interface BtnProps {
  btnStyle?: ViewStyle;
  titleStyle?: TextStyle;
  title?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
}
const Button = ({
  btnStyle = {},
  titleStyle = {},
  title = 'Title',
  disabled = false,
  icon = null,
  onPress,
}: BtnProps) => {
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
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Button;
