import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddNewGroup, FriendsList, GroupDetails, GroupsList } from '../screens';
import { CommunityStackParamList } from '../types';
import { MyHeader } from '../components';
import store from '../store/store';

export default function CommunityNav() {
  const Stack = createNativeStackNavigator<CommunityStackParamList>();

  return (
    <Stack.Navigator initialRouteName="FriendsList">
      <Stack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{
          title: 'Friends',
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
          title: 'Groups',
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
          title: route.params.item.title,
          header: ({ route, navigation, options }) => (
            <MyHeader
              route={route}
              title={options.title}
              leftIcon={true}
              onPressLeftIcon={() => {
                navigation.goBack();
                store.archiveIds.set([]);
              }}
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
