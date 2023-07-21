/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Linking,
  Platform,
  Alert,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate } from '@hookstate/core';

// @ts-ignore
import ShareMenu from 'react-native-share-menu';
import { RootNav } from './src/navigation';
import store from './src/store/store';
import { getContentDetails, getFCMToken, getUserData } from './src/utils';
import { ScreenLoader } from './src/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { colors } from './src/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Slides } from './src/types';
import { Icon } from '@rneui/themed';

function App(): JSX.Element {
  const { userData, screenLoading } = useHookstate(store);
  const [appIntro, setAppIntro] = useState(false);

  const setUserData = async () => {
    const storedData = await getUserData();
    userData.set(storedData);
  };

  messaging().onNotificationOpenedApp(async notification => {
    console.log(
      'notification',
      notification.data,
      `seaglass://community_nav/group_details?groudId=${notification.data?.groupId}`,
    );
    if (userData.get()) {
      await getContentDetails(notification.data?.contentId!);
      await Linking.openURL(`seaglass://details`);
    }
  });

  const getToken = async () => {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log('Token mila', fcmToken);
      if (!fcmToken) {
        store.screenLoading.set(true);
        const token = await getFCMToken();
        console.log('fcmToken', Platform.OS, token);
        if (token) {
          // user has a device token
          store.fcmToken.set(token);
          await AsyncStorage.setItem('fcmToken', token);
          store.screenLoading.set(false);
        } else {
          store.screenLoading.set(false);
          console.log('get se nhi mila');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '213956113520-4e23h6t7tc4279r64t5r0vdrmt5j80va.apps.googleusercontent.com',
    });
    getToken();
    setUserData();
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  const handleShare = useCallback(async (item?: any) => {
    if (!item || !Boolean(item?.data?.length)) {
      console.log('Data not found on share', item);
      return;
    }
    console.log('item=====>>>>>>>', item);
    const url =
      Platform.OS == 'android'
        ? item?.data
        : item.data?.length > 1
        ? item?.data[1].data
        : item?.data[0].data;

    console.log('linkOpen', url, userData.get());

    if (userData.get()) {
      const linkOpen = await Linking.openURL(
        `seaglass://share?url=${encodeURIComponent(url)}`,
      );
    } else {
      Alert.alert('Please Login to share content with friends!');
    }
    // Linking.openURL('seaglass://share');
    // You can receive extra data from your custom Share View
  }, []);

  const slides = [
    {
      key: 1,
      image: require('./src/assets/image.jpg'),
    },
    {
      key: 2,
      image: require('./src/assets/image.jpg'),
    },
    {
      key: 3,
      image: require('./src/assets/image.jpg'),
    },
  ];

  const _renderItem = ({ item }: { item: Slides }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={item.image} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.sliderNextButton}>
        <Icon
          type="ionicon"
          name="md-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderPrevButton = () => {
    return (
      <View style={styles.sliderNextButton}>
        <Icon
          type="ionicon"
          name="md-arrow-back"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.sliderNextButton}>
        <Icon
          type="ionicon"
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _onDone = () => {
    setAppIntro(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {userData.get() || appIntro ? (
          <>
            <ScreenLoader show={screenLoading.get()} />
            <RootNav />
          </>
        ) : (
          <AppIntroSlider
            data={slides}
            showPrevButton
            renderItem={_renderItem}
            renderDoneButton={_renderDoneButton}
            renderPrevButton={_renderPrevButton}
            renderNextButton={_renderNextButton}
            onDone={_onDone}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sliderNextButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
});

export default App;
