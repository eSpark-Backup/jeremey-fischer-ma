import React, { useState } from 'react';
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
import { CommunityNavProps, Group } from '../../../types';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';

export default function GroupsList() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const groupsStore: any = useHookstate(store.groups);
  const groups: Group[] = groupsStore.get();
  const userGroupsStore: any = useHookstate(store.userGroups);
  const userGroups: Group[] = userGroupsStore.get();
  const { loadGroups } = useHookstate(store);
  const [groupSearch, setGroupSearch] = useState('');

  const searchGroup = (e: string) => {
    setGroupSearch(e);
    if (e) {
      const chars = e.toLowerCase();
      const arrr = groups?.filter(item =>
        item.groupName.toLowerCase().includes(chars),
      );
      userGroupsStore.set(arrr);
    } else {
      userGroupsStore.set(JSON.parse(JSON.stringify(groups)));
    }
  };

  const clearSearch = () => {
    setGroupSearch('');
    userGroupsStore.set(JSON.parse(JSON.stringify(groups)));
  };

  return (
    <MyCanvas>
      <SearchBar
        value={groupSearch}
        placeholder="Search by group name"
        onChangeText={searchGroup}
        clearInput={clearSearch}
      />
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
          data={userGroups}
          renderItem={({ item }) => (
            <CommunityCard
              group
              name={item.groupName}
              details={`${item.Members.length} Members`}
              members={item?.Members!}
              image={item.groupCreator?.image!}
              onPress={() =>
                navigation.navigate('GroupDetails', {
                  item: { title: item.groupName, contents: item.contents },
                })
              }
              contents={item.contents}
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
