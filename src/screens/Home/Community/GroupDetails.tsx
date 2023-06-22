import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FeedCard, GapView, MyCanvas } from '../../../components';

export default function GroupDetails() {
  return (
    <MyCanvas>
      <ScrollView>
        <FeedCard
          date="today"
          image={'https://randomuser.me/api/portraits/men/22.jpg'}
          time={'3h'}
        />
        <GapView />
        <FeedCard
          date="yesterday"
          image={'https://randomuser.me/api/portraits/men/21.jpg'}
          time={'2h'}
        />
        <GapView />
        <FeedCard
          image={'https://randomuser.me/api/portraits/men/20.jpg'}
          time={'2h'}
        />
      </ScrollView>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
