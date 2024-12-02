import React, { useEffect } from 'react';
import { LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native';
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
import { extractAllFeeds } from '../utils/globalFunctions';
import { getAllGroupInboxData } from '../api/comments.controller';

export default function TabNav() {
  const isFocused = useIsFocused();
  const userData = useHookstate(store?.userData);
  const newsFeed = useHookstate(store?.newsFeed);
  const hideSearch = useHookstate(store?.hideSearchFAB);
  const loadNewsFeed = useHookstate(loaders?.newsFeed);
  const Tab = createMaterialTopTabNavigator<TabNavParamList>();
  const navigation = useNavigation<NavProps['navigation']>();

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  useEffect(() => {
    getNewsFeed();
    getInboxGroupData();
  }, [isFocused]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [hideSearch.get()]);

  async function getNewsFeed() {
    try {
      loadNewsFeed.set(true);
      const data = await getNewsFeedContent(userData?.get()?.['uid'] ?? '');
      if (data?.data != null) {
        newsFeed.set(data?.data);
        extractAllFeeds(data?.data);
        loadNewsFeed.set(false);
      } else {
        console.log('message', data.message);
        newsFeed.set([]);
        loadNewsFeed.set(false);
      }
    } catch (e) {
      console.log('err at newsfeed fetch', e);
      loadNewsFeed.set(false);
    }
  }

  async function getInboxGroupData() {
    store.loadGroups.set(true);
    try {
      const res = await getAllGroupInboxData(store.userData.get()?.uid);
      const ids = store.archiveIds.get();
      const reduceArchived: any = res.data?.filter(
        item => item?.isArchived == false && !ids.includes(item?.id!),
      );

      console.log('Idhar agaya   ' + JSON.stringify(reduceArchived));
      ids.map(item => item);
      store.groupContent.set(reduceArchived);
      store.loadGroups.set(false);
      return res.data;
    } catch (error) {
      store.loadGroups.set(false);
      console.error(error);
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
        style={{
          ...styles.FAB,
          right: 20,
          // left: hideSearch.get() ? 20 : undefined,
        }}
        visible={true}
        icon={{ name: 'search', color: 'white' }}
        color={colors.card}
        onPress={() => navigation.navigate('Search')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  FAB: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
