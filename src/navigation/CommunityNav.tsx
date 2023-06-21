import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AddNewGroup,
  FriendsList,
  GroupDetails,
  GroupsList,
  Home,
} from '../screens';
import Details from '../screens/Home/Details';
import { HomeStackParamList } from '../types';
import { MyHeader } from '../components';
import { getFriends } from '../screens/Home/utils/function';
import { useHookstate } from '@hookstate/core';
import store from '../store/store';

export default function CommunityNav() {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const { friends, loadFriends } = useHookstate(store);

  return (
    <Stack.Navigator initialRouteName="FriendsList">
      <Stack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{
          title: 'Friends List',
          header: ({ route, navigation, options }) => (
            <MyHeader
              route={route}
              title={options.title}
              leftIcon={true}
              onPressLeftIcon={() => navigation.navigate('Tab')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="GroupsList"
        component={GroupsList}
        options={{
          title: 'Groups List',
          header: ({ route, navigation, options }) => (
            <MyHeader
              route={route}
              title={options.title}
              leftIcon={true}
              onPressLeftIcon={() => navigation.navigate('Tab')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={({ route }) => ({
          title: route.params.title,
          header: ({ route, navigation, options }) => (
            <MyHeader
              route={route}
              title={options.title}
              leftIcon={true}
              onPressLeftIcon={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddNewGroup"
        component={AddNewGroup}
        options={{
          title: 'Add New Group',
          header: ({ route, navigation, options }) => (
            <MyHeader
              route={route}
              title={options.title}
              leftIcon={true}
              onPressLeftIcon={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
