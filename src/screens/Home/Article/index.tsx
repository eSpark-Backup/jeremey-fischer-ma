import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FAB } from '@rneui/themed';

import { colors } from '../../../theme';
import { FeedCard, MyCanvas } from '../../../components';
import { NavProps } from '../../../types';
import { getAllRequest } from '../../../api/friendRequest.controller';

export default function ArticleScreen() {
  const navigation = useNavigation<NavProps['navigation']>();
  getAllRequest('1686658085577').then(res => {
    console.log('get all groups', JSON.stringify(res));
  });
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
        onPress={() => navigation.navigate('Search')}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
