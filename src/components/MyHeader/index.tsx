import {ParamListBase, RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MyText from '../MyText';
import {Icon} from '@rneui/themed';

interface Props {
  route: RouteProp<ParamListBase>;
}

export default function MyHeader(props: Props) {
  return (
    <View style={styles.container}>
      <MyText textStyle={styles.text}>{props.route.name}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 32,
  },
});
