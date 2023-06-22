import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

import { Archive, Profile } from '../screens';
import Settings from '../screens/Profile/Details';
import { ProfileStackParamList } from '../types';
import { MyHeader } from '../components';

export default function ProfileNav() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        header: ({ route }) => <MyHeader route={route} />,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ route, navigation }) => (
            <MyHeader
              route={route}
              leftIcon
              onPressLeftIcon={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
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
        name="Archive"
        component={Archive}
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
    </Stack.Navigator>
  );
}
