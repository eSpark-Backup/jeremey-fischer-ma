import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ParamListBase, RouteProp, useTheme} from '@react-navigation/native';

import MyText from '../MyText';
import {Icon} from '@rneui/themed';

interface Props {
  route: RouteProp<ParamListBase>;
  icon?: boolean;
  onPressIcon?: () => void;
}

export default function MyHeader(props: Props) {
  console.log('props', props);
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {props?.icon && (
        <Icon
          name="arrow-back"
          type="ionicon"
          color={colors.primary}
          onPress={props?.onPressIcon}
          style={{marginRight: 10}}
        />
      )}
      <MyText textStyle={styles.text}>{props.route.name}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
});
