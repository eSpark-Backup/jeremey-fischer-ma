import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MyText from '../MyText';

export default function EmptyFeedLabel({ label }: { label: string }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      }}>
      <MyText children={label} />
    </View>
  );
}

const styles = StyleSheet.create({});
