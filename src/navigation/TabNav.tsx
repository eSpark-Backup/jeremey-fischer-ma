import React, { useEffect, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FAB, Icon } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { CustomTabBar } from '../components';
import ArticleScreen from '../screens/Home/Article';
import AudioScreen from '../screens/Home/Audio';
import PodcastScreen from '../screens/Home/Podcast/indexs';
import VideoScreen from '../screens/Home/Video';
import { NavProps, TabNavParamList } from '../types';
import { getNewsFeedContent } from '../api/content.controller';
import store from '../store/store';
import loaders from '../store/loaders';
import { colors } from '../theme';

export default function TabNav() {
  const isFocused = useIsFocused();
  const userData = useHookstate(store?.userData);
  const newsFeed = useHookstate(store?.newsFeed);
  const loadNewsFeed = useHookstate(loaders?.newsFeed);
  const Tab = createMaterialTopTabNavigator<TabNavParamList>();
  const navigation = useNavigation<NavProps['navigation']>();
  console.log('userData', userData.get()?.['uid']);

  useEffect(() => {
    getNewsFeed();
  }, [isFocused]);

  async function getNewsFeed() {
    try {
      loadNewsFeed.set(true);
      const data = await getNewsFeedContent(userData?.get()?.['uid'] ?? '');
      if (data?.data != null) {
        newsFeed.set(data?.data);
        loadNewsFeed.set(false);
      } else {
        console.log('message', data.message);
        loadNewsFeed.set(false);
      }
    } catch (e) {
      console.log('err at newsfeed fetch', e);
      loadNewsFeed.set(false);
    }
  }

  return (
    <>
      <Tab.Navigator
        tabBar={props => {
          return <CustomTabBar {...props} onPress={() => getNewsFeed()} />;
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
      <FAB
        style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1 }}
        visible={true}
        icon={{ name: 'search', color: 'white' }}
        color={colors.card}
        onPress={() => navigation.navigate('Search')}
      />
    </>
  );
}

const styles = StyleSheet.create({});
