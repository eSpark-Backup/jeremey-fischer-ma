import { BackHandler, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FriendRequest, User } from '../types';
import { getAllFreinds } from '../api/user.controller';
import { getAllRequest, sendRequest } from '../api/friendRequest.controller';
import store from '../store/store';
import { getGroupById, getMyGroups } from '../api/groups.controller';
import { getSearchedFriend } from '../screens/Home/utils/function';
import messaging from '@react-native-firebase/messaging';

export const disableBackButton = () => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  return () => backHandler.remove();
};

export const getUserData = async () => {
  const jsonValue = await AsyncStorage.getItem('@userData');
  console.log('jsonValue', jsonValue);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const storeUserData = async (
  value: FirebaseFirestoreTypes.DocumentData | null | undefined,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const AddFriend = async (id: string, email: string) => {
  const data = <FriendRequest>{
    senderId: store.userData.get()?.uid,
    receiverId: id,
    status: 'pending',
  };
  store.loadFriends.set(true);
  sendRequest(data, store.userData.get()?.userName).then(res => {
    console.log('request sent', JSON.stringify(res));
    getSearchedFriend(email);
  });
};

export const getFriendRequests = async () => {
  store.loadRequests.set(true);
  getAllRequest(store.userData.get()?.uid ?? '').then(res => {
    store.friendRequests.set(res.data);
    store.loadRequests.set(false);
  });
};

export const getFriends = async () => {
  store.loadFriends.set(true);
  getAllFreinds(store.userData.get()?.uid ?? '').then(res => {
    store.friends.set(res.data);
    store.loadFriends.set(false);
  });
};

export const getGroups = async () => {
  store.loadGroups.set(true);
  try {
    const res = await getMyGroups(store.userData.get()?.uid ?? '');
    store.userGroups.set(res.data);
    store.groups.set(res.data);
    store.loadGroups.set(false);
    return res.data;
  } catch (error) {
    store.loadGroups.set(false);
    console.error(error);
  }
};

export const getGroupContent = async (id: string) => {
  store.loadGroups.set(true);
  try {
    const res = await getGroupById(id, store.userData.get()?.uid);
    const ids = store.archiveIds.get();
    const reduceArchived: any = res.data?.contents?.filter(
      item => item?.isArchived == false && !ids.includes(item?.id!),
    );
    ids.map(item => item);
    store.groupContent.set(reduceArchived);
    store.loadGroups.set(false);
    return res.data;
  } catch (error) {
    store.loadGroups.set(false);
    console.error(error);
  }
};

/**
 * @param {url} url of a content to check its type
 * @returns {type} return type wheter it `music`, `video`, `podcast` or `article`
 */

export const getContentTypeFromUrl = async (url: string) => {
  try {
    if (/spotify.*\/track|spotify.*\/album|spotify.*\/playlist/.test(url)) {
      return 'Audio';
    } else if (/tidal/.test(url)) {
      return 'Audio';
    } else if (/music\.apple/.test(url)) {
      return 'Audio';
    } else if (/deezer/.test(url)) {
      return 'Audio';
    } else if (/pandora/.test(url)) {
      return 'Audio';
    } else if (/amazon\.com\/music/.test(url)) {
      return 'Audio';
    } else if (/music\.youtube/.test(url)) {
      return 'Audio';
    } else if (/soundcloud/.test(url)) {
      return 'Audio';
    } else if (/youtube|youtu.be/.test(url)) {
      return 'Video';
    } else if (/vimeo/.test(url)) {
      return 'Video';
    } else if (/netflix/.test(url)) {
      return 'Video';
    } else if (/max/.test(url)) {
      return 'Video';
    } else if (/showtime/.test(url)) {
      return 'Video';
    } else if (/paramountplus/.test(url)) {
      return 'Video';
    } else if (/starz/.test(url)) {
      return 'Video';
    } else if (/disney/.test(url)) {
      return 'Video';
    } else if (/peacock/.test(url)) {
      return 'Video';
    } else if (/(spotify.*\/episode)/.test(url)) {
      return 'Podcast';
    } else if (/podcasts\.apple/.test(url)) {
      return 'Podcast';
    } else if (/stitcher/.test(url)) {
      return 'Podcast';
    } else {
      return 'Article';
    }
  } catch (error) {
    console.log('getContentTypeFromUrl error', error);
    return 'Article';
  }
};

/**
 * Fixes a broken URL by replacing 'https:/' or 'http:/' with 'https://' or 'http://'.
 * @param {string} url - The URL to fix.
 * @returns {string} - The fixed URL.
 */
export const fixBrokenURL = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text?.replace(/:\//, '://')?.match(urlRegex);
  let url = text;
  if (urls && urls.length > 0) {
    url = urls[0];
    if (url.startsWith('https:///')) {
      // Replace 'https:///' with 'https://'
      url = url.replace('https:///', 'https://');
    } else if (url.startsWith('http:///')) {
      url = url.replace('http:///', 'http://');
    }
    // if (url.startsWith('https:/') || url.startsWith('http:/')) {
    //   url = url.replace(/:\//, '://');
    // }
  }
  return url;
};

/**
 * Just ask notification permission for IOS.
 * @returns {null} - return nothing.
 */
export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Seaglass Notification Permission',
        message:
          'Seaglass needs access to your notifications ' +
          'so you can recieve notifications',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the notifications');
    } else {
      console.log('notifications permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

/**
 * Get Device FCMToken
 * @returns {string} - return fcm token.
 */
export const getFCMToken = async () => {
  try {
    await requestUserPermission();
    var token = '';
    if (Platform.OS == 'ios') {
      try {
        await messaging().registerDeviceForRemoteMessages();
        messaging().setAutoInitEnabled(true);
        const apns = await messaging().getAPNSToken();
        await AsyncStorage.setItem('apns', apns ?? '');
        console.log('sx getAPNSToken', apns);
        await messaging().setAPNSToken(apns ?? '');
        // let tokenRefreshListenerUnsubscriber = messaging().onTokenRefresh(
        //   token => {
        //     console.log(
        //       'we have a refreshed token and should do something with it: ' +
        //         token,
        //     );
        //   },
        // );
        token = await messaging().getToken();
        console.log('sx', apns, 'token \n', token);
      } catch (e) {
        console.log('err', e);
      }
    } else {
      token = await messaging().getToken();
    }
    console.log(`${Platform.OS} token`, token);
    return token;
  } catch (error) {
    console.log('catch error', error);
    return '';
  }
};
