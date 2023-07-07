/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, Linking, Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate } from '@hookstate/core';

// @ts-ignore
import ShareMenu from 'react-native-share-menu';
import { RootNav } from './src/navigation';
import store from './src/store/store';
import { getFCMToken, getUserData } from './src/utils';
import { ScreenLoader } from './src/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { colors } from './src/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const { userData, screenLoading } = useHookstate(store);

  const setUserData = async () => {
    const storedData = await getUserData();
    console.log('storedData', storedData);
    userData.set(storedData);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '213956113520-4e23h6t7tc4279r64t5r0vdrmt5j80va.apps.googleusercontent.com',
    });

    const getToken = async () => {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await getFCMToken();
        console.log('fcmToken', Platform.OS, fcmToken);
        if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    };
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
    if (userData.get()) {
      Linking.openURL(`seaglass://share?url=${url}`);
    } else {
      Alert.alert('Please Login to share content with friends!');
    }
    // Linking.openURL('seaglass://share');
    // You can receive extra data from your custom Share View
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenLoader show={screenLoading.get()} />
        <RootNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
