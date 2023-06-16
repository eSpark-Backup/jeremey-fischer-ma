import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import {
  CommunityCard,
  GapView,
  MyCanvas,
  NormalBtn,
  SearchBar,
  Tabs,
} from '../../../components';
import { HomeNavProps } from '../../../types';

export default function GroupsList() {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  return (
    <MyCanvas>
      <SearchBar placeholder="Search by group name" />
      <Tabs selectedTabId={2} />
      {/* <GapView /> */}
      <ScrollView style={{ flex: 1 }}>
        <CommunityCard
          name="Group 1"
          details="5 Members"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          group
          onPress={() =>
            navigation.navigate('GroupDetails', { title: 'Group 1' })
          }
        />
        <CommunityCard
          name="Group 2"
          details="5 Members"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          group
          onPress={() =>
            navigation.navigate('GroupDetails', { title: 'Group 2' })
          }
        />
        <CommunityCard
          name="Group 3"
          details="5 Members"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          group
          onPress={() =>
            navigation.navigate('GroupDetails', { title: 'Group 3' })
          }
        />
      </ScrollView>
      <GapView />
      <NormalBtn
        title="Add Group"
        btnStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '95%',
        }}
        onPress={() => navigation.navigate('AddNewGroup')}
        icon={<Icon name="user-plus" type="font-awesome-5" color={'#ffffff'} />}
      />
      <GapView length={5} />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
