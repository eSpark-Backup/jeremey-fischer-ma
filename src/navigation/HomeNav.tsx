import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens';
import Details from '../screens/Home/Details';
import {HomeNavProps, HomeStackParamList} from '../types';
import {MyHeader} from '../components';

export default function HomeNav() {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({route}) => <MyHeader route={route} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          header: ({route, navigation}) => (
            <MyHeader
              route={route}
              icon={true}
              onPressIcon={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
