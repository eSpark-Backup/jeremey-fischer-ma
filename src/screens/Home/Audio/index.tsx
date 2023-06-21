import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FeedCard, MyCanvas } from '../../../components';

export default function AudioScreen() {
  return (
    <MyCanvas>
      <FeedCard
        date="today"
        image={'https://randomuser.me/api/portraits/men/22.jpg'}
        time={'3h'}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
