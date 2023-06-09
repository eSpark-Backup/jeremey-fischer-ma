import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';
import {MyTheme} from '../theme';

export default function RootNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={() => <View />} /> */}
        <Stack.Screen name="Tab" component={TabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
