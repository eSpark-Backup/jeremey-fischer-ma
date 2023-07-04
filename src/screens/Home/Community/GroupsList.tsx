import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { CommunityNavProps, Group, HomeNavProps } from '../../../types';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';
import { getGroups } from '../../../utils';
import useUpdateEffect from '../../../utils/hooks/useUpdateEffect';
import { getSearchedGroup } from '../utils/function';

export default function GroupsList() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const groupsStore: any = useHookstate(store.groups);
  const groups: Group[] = groupsStore.get();
  const { loadGroups } = useHookstate(store);
  const [groupSearch, setGroupSearch] = useState('');
  const [userGroups, setUserGroups] = useState<Group[] | null>();

  useFocusEffect(
    React.useCallback(() => {
      getGroups().then(data => {
        setUserGroups(data);
      });
    }, []),
  );

  const searchGroup = (e: string) => {
    setGroupSearch(e);
    if (e) {
      const chars = e.toLowerCase();
      const arrr = groups?.filter(item =>
        item.groupName.toLowerCase().includes(chars),
      );
      setUserGroups(arrr);
    } else {
      setUserGroups(groups);
    }
  };

  const clearSearch = () => {
    setGroupSearch('');
    setUserGroups(groups);
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
