import React from 'react';
import {StyleSheet, View} from 'react-native';

import MyText from '../MyText';

export default function SubHeader({title}: {title: string}) {
  return (
    <View style={styles.container}>
      <MyText children={title} textStyle={{fontSize: 18}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: '95%', alignSelf: 'center', marginVertical: 10},
});
