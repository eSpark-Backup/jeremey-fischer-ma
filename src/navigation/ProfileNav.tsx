import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

import { Archive, Profile } from '../screens';
import Settings from '../screens/Profile/Details';
import { ProfileStackParamList } from '../types';
import { MyHeader } from '../components';
import { UpdateUserNotificationSetting } from '../api/notification.controller';
import store from '../store/store';
import { storeUserData } from '../utils';
import { useHookstate } from '@hookstate/core';

export default function ProfileNav() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();
  const userData = useHookstate(store?.userData)?.get();
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
              onPressLeftIcon={() => {
                navigation.goBack();
                const data = {
                  ...userData,
                  NotificationSetting:
                    store.currentUserNotificationSetting.get(),
                };
                if (store.currentUserNotificationSetting.get() != null) {
                  storeUserData(data);
                  UpdateUserNotificationSetting(
                    userData?.uid,
                    store.currentUserNotificationSetting.get()!,
                  );
                }
              }}
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
