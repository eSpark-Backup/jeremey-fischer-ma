import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Avatar} from '@rneui/themed';

import {Archive} from '../screens';
import {ArchiveOutlineSvg, ArchiveSvg} from '../assets';
import {MyHeader} from '../components';

import HomeNav from './HomeNav';
import ProfileNav from './ProfileNav';

export default function TabNav() {
  const Tab = createBottomTabNavigator();
  const {colors} = useTheme();

  const renderArchive = (focused: boolean, color: string) => {
    return focused ? (
      <ArchiveSvg color={color} width={35} height={35} />
    ) : (
      <ArchiveOutlineSvg color={color} width={35} height={35} />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
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
        name="ProfileNav"
        component={ProfileNav}
        options={{
          headerShown: false,
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
