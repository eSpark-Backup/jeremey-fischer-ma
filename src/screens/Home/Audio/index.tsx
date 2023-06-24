import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FAB } from '@rneui/themed';

import { FeedCard, MyCanvas } from '../../../components';
import { colors } from '../../../theme';
import { NavProps } from '../../../types';

export default function AudioScreen() {
  const navigation = useNavigation<NavProps['navigation']>();
  return (
    <MyCanvas>
      <FeedCard
        date="today"
        time={'3h'}
      />
      <FAB
        style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1 }}
        visible={true}
        icon={{ name: 'search', color: 'white' }}
        color={colors.card}
        onPress={() => navigation.navigate('Search')}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
