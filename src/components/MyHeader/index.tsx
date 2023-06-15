import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ParamListBase, RouteProp, useTheme } from '@react-navigation/native';

import MyText from '../MyText';
import { Icon } from '@rneui/themed';

interface Props {
  route: RouteProp<ParamListBase>;
  title?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  leftIconName?: string;
  rightIconName?: string;
  leftIconType?: string;
  rightIconType?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}

export default function MyHeader(props: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props?.leftIcon && (
          <Icon
            name={props?.leftIconName ? props?.leftIconName : 'arrow-back'}
            type={props?.leftIconType ? props?.leftIconType : 'ionicon'}
            color={colors.primary}
            onPress={props?.onPressLeftIcon}
            style={{ marginRight: 10 }}
          />
        )}
        <MyText textStyle={styles.text}>
          {props.title ?? props.route.name}
        </MyText>
      </View>
      {props?.rightIcon && (
        <Icon
          name={props?.rightIconName ? props?.rightIconName : 'arrow-back'}
          type={props?.rightIconType ? props?.rightIconType : 'ionicon'}
          color={colors.primary}
          onPress={props?.onPressRightIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 32,
  },
});
