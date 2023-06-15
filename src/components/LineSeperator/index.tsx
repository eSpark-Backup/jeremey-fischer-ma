import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function LineSeperator() {
  return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
  seperator: {borderWidth: 1, borderColor: 'white', marginVertical: 10},
});
