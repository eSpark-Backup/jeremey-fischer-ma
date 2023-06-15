import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';

import {Profile} from '../screens';
import Settings from '../screens/Profile/Details';
import {ProfileStackParamList} from '../types';
import {MyHeader} from '../components';

export default function ProfileNav() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        header: ({route}) => <MyHeader route={route} />,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({route, navigation}) => (
            <MyHeader
              route={route}
              rightIcon
              rightIconName='ios-settings-outline'
              rightIconType='ionicon'
              onPressRightIcon={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: ({route, navigation}) => (
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
