import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';

import { CustomTabBar } from '../components';

import ArticleScreen from '../screens/Home/Article';
import AudioScreen from '../screens/Home/Audio';
import PodcastScreen from '../screens/Home/Podcast/indexs';
import VideoScreen from '../screens/Home/Video';
import { TabNavParamList } from '../types';

export default function TabNav() {
  const Tab = createMaterialTopTabNavigator<TabNavParamList>();
  return (
    <Tab.Navigator
      tabBar={props => {
        return <CustomTabBar {...props} />;
      }}
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
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
        name="Audio"
        component={AudioScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
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
        name="Podcast"
        component={PodcastScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
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
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'ios-home' : 'ios-home-outline'}
              type="ionicon"
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
