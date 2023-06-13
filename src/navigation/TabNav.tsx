import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Avatar} from '@rneui/themed';

import {Archive, Profile} from '../screens';
import {ArchiveOutlineSvg, ArchiveSvg} from '../assets';
import {MyHeader} from '../components';

import HomeNav from './HomeNav';

export default function TabNav() {
  const Tab = createBottomTabNavigator();

  const renderArchive = (focused: boolean, color: string) => {
    return focused ? (
      <ArchiveSvg color={color} width={35} height={35} />
    ) : (
      <ArchiveOutlineSvg color={color} width={35} height={35} />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        header: ({route}) => <MyHeader route={route} />,
      }}>
      <Tab.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused, size}) => (
            <Icon
              name={focused ? 'ios-home' : 'ios-home-outline'}
              type="ionicon"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Archive"
        component={Archive}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return renderArchive(focused, color);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return (
              <Avatar
                rounded
                containerStyle={{borderWidth: 2, borderColor: color}}
                source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
