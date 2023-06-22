import React, { useEffect, useState } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useHookstate } from '@hookstate/core';

import TabNav from './TabNav';
import { MyTheme } from '../theme';
import { Login, Share } from '../screens';
import { RootStackParamList } from '../types';
import { MyHeader } from '../components';
import { getUserData } from '../utils';
import store from '../store/store';
import ProfileNav from './ProfileNav';
import CommunityNav from './CommunityNav';
import Details from '../screens/Home/Details';
import Search from '../screens/Home/Search';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['seaglass://'], // Specify the custom URL scheme for your app
  config: {
    screens: {
      Share: 'share', // Define the route name and corresponding URL path
    },
  },
};

export default function RootNav() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { userData } = useHookstate(store);

  return (
    <NavigationContainer linking={linking} theme={MyTheme}>
      <Stack.Navigator
        // initialRouteName="Share"
        initialRouteName={userData.get() ? 'Tab' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            header: ({ route, navigation }) => (
              <MyHeader
                route={route}
                leftIcon={true}
                onPressLeftIcon={() => navigation.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            header: ({ route, navigation }) => (
              <MyHeader
                route={route}
                leftIcon={true}
                onPressLeftIcon={() => navigation.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ProfileNav"
          component={ProfileNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CommunityNav"
          component={CommunityNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Share"
          component={Share}
          options={{
            header: ({ route, navigation }) => (
              <MyHeader
                route={route}
                title="New Share"
                leftIcon
                onPressLeftIcon={() => navigation.navigate('Tab')}
                leftIconName="close"
                leftIconType="ionicon"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
