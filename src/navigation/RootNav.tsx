import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNav from './TabNav';
import { MyTheme } from '../theme';
import { Login, Share } from '../screens';
import { RootStackParamList } from '../types';

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
  return (
    <NavigationContainer linking={linking} theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tab" component={TabNav} />
        <Stack.Screen name="Share" component={Share} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
