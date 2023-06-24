import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import {
  CommunityCard,
  GapView,
  MyCanvas,
  MyText,
  NormalBtn,
  SearchBar,
  Tabs,
} from '../../../components';
import { CommunityNavProps, HomeNavProps } from '../../../types';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';

export default function GroupsList() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const { groups, loadGroups } = useHookstate(store);

  return (
    <MyCanvas>
      <SearchBar placeholder="Search by group name" />
      <Tabs selectedTabId={2} />
      {loadGroups.get() ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <FlatList
          data={groups.get()}
          renderItem={({ item }) => (
            <CommunityCard
              group
              name={item.groupName}
              details={`${item.Members.length} Members`}
              image="https://randomuser.me/api/portraits/men/22.jpg"
              onPress={() =>
                navigation.navigate('GroupDetails', { title: item.groupName, content: item.contents })
              }
            />
          )}
          ListEmptyComponent={
            <MyText
              textStyle={{ textAlign: 'center', marginTop: 10 }}
              children="No Groups to Show"
            />
          }
        />
      )}
      {/* <ScrollView style={{ flex: 1 }}>
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
      </ScrollView> */}
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
