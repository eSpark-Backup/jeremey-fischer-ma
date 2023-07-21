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
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate } from '@hookstate/core';

// @ts-ignore
import ShareMenu from 'react-native-share-menu';
import { RootNav } from './src/navigation';
import store from './src/store/store';
import { getContentDetails, getFCMToken, getUserData } from './src/utils';
import { MyText, ScreenLoader } from './src/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { colors } from './src/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Slides } from './src/types';

function App(): JSX.Element {
  const { userData, screenLoading } = useHookstate(store);
  const [appIntro, setAppIntro] = useState(false);
  let slider: AppIntroSlider | undefined;

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
  }, []);

  const slides = [
    {
      key: 1,
      image: require('./src/assets/scn1.png'),
    },
    {
      key: 2,
      image: require('./src/assets/scn2.png'),
    },
    {
      key: 3,
      image: require('./src/assets/scn3.png'),
    },
    {
      key: 4,
      image: require('./src/assets/scn4.png'),
    },
    {
      key: 5,
      image: require('./src/assets/scn5.png'),
    },
  ];

  const _renderItem = ({ item }: { item: Slides }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={item.image} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  };

  const _renderPagination = (activeIndex: number) => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationInnerContainer}>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    ...styles.dot,
                    backgroundColor:
                      i === activeIndex ? colors.primary : 'white',
                  }}
                  onPress={() => slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View>
            {activeIndex < slides.length - 1 ? (
              <TouchableOpacity
                style={styles.sliderNextButton}
                onPress={() => slider?.goToSlide(activeIndex + 1, true)}>
                <MyText children={'Next'} textStyle={styles.button} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.sliderNextButton}
                onPress={_onDone}>
                <MyText children={'Done'} textStyle={styles.button} />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
            renderItem={_renderItem}
            renderPagination={_renderPagination}
            ref={ref => (slider = ref!)}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sliderNextButton: {
    width: 80,
    paddingVertical: 5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  paginationContainer: { position: 'absolute', bottom: 16, right: 0, left: 0 },
  paginationInnerContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  paginationDots: {
    height: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  button: { fontSize: 18, color: 'white' },
});

export default App;
