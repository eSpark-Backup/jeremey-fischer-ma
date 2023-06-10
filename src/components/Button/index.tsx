import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {SCREEN_WIDTH, themeColor} from '../../constants';
import GapView from '../GapView';

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
        disabled && {opacity: 0.6},
        icon != null && {flexDirection: 'row', paddingHorizontal: 20},
      ]}>
      <View>
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </View>
      {icon && <>{icon}</>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleStyle: {color: '#fff'},
  btnContainer: {
    backgroundColor: themeColor.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 80,
  },
});

export default Button;
