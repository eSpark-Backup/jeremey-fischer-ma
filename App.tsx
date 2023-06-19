/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate } from '@hookstate/core';

// @ts-ignore
import ShareMenu from 'react-native-share-menu';
import { RootNav } from './src/navigation';
import store from './src/store/store';
import { getUserData } from './src/utils';
import { ScreenLoader } from './src/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    setUserData();
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  const handleShare = useCallback((item?: any) => {
    if (!item || !Boolean(item?.data?.length)) {
      console.log('Data not found on share', item);
      return;
    }
    Linking.openURL('seaglass://share');
    console.log('Data found on share', item);
    // Linking.openURL('seaglass://share');
    // You can receive extra data from your custom Share View
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenLoader show={screenLoading.get()} />
        <RootNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
