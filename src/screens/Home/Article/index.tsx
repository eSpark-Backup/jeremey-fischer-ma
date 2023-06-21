import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from '@rneui/themed';

import { colors } from '../../../theme';
import { FeedCard, MyCanvas } from '../../../components';

export default function ArticleScreen() {
  return (
    <MyCanvas>
      <FeedCard
        date="today"
        image={'https://randomuser.me/api/portraits/men/22.jpg'}
        time={'3h'}
      />
      <FAB
        style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1 }}
        visible={true}
        icon={{ name: 'search', color: 'white' }}
        color={colors.card}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
