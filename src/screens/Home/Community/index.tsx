import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsList from './FriendsList';
import GroupsList from './GroupsList';
import { MyCanvas, SearchBar, Tabs } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { Group, NavProps } from '../../../types';
import { getSearchedFriend } from '../utils/function';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { getFriends } from '../../../utils';

const CommunityTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation<NavProps['navigation']>();
  const groupsStore: any = useHookstate(store.groups);
  const groups: Group[] = groupsStore.get();
  const userGroupsStore: any = useHookstate(store.userGroups);

  const [currTab, setCurrTab] = useState('Friends');
  const [searchVal, setSearchVal] = useState('');

  const checkSearchedEmail = (searchVal: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(searchVal)) {
      getSearchedFriend(searchVal?.toLowerCase());
    } else {
      console.log('Please enter a valid email');
    }
  };

  const searchGroup = (e: string) => {
    setSearchVal(e);
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
    if (currTab == 'Friends') {
      setSearchVal('');
      getFriends();
    } else {
      setSearchVal('');
      userGroupsStore.set(JSON.parse(JSON.stringify(groups)));
    }
  };

  return (
    <MyCanvas>
      <SearchBar
        value={searchVal}
        placeholder={`Search by ${
          currTab == 'Friends' ? 'email' : 'group name'
        }`}
        onChangeText={currTab == 'Friends' ? setSearchVal : searchGroup}
        clearInput={clearSearch}
        onSubmitEditing={() =>
          currTab == 'Friends' ? checkSearchedEmail(searchVal) : null
        }
      />
      <Tab.Navigator
        tabBar={props => {
          if (props.state.index == 0 && currTab != 'Friends') {
            setCurrTab('Friends');
            setSearchVal('');
            navigation.setParams({
              title: 'Friends',
            });
          } else if (props.state.index == 1 && currTab != 'Groups') {
            setCurrTab('Groups');
            setSearchVal('');
            navigation.setParams({
              title: 'Groups',
            });
          }
          return <Tabs {...props} />;
        }}>
        <Tab.Screen name="FriendsTab" component={FriendsList} />
        <Tab.Screen name="GroupsTab" component={GroupsList} />
      </Tab.Navigator>
    </MyCanvas>
  );
};

export default CommunityTab;
