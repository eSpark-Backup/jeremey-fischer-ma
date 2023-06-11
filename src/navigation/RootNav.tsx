import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
import {MyTheme} from '../theme';
import {Login} from '../screens';
import {RootStackParamList} from '../types';

export default function RootNav() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tab" component={TabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
