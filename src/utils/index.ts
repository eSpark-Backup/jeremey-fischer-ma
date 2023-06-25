import { BackHandler } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { State } from '@hookstate/core';
import { FriendRequest, User } from '../types';
import { getAllFreinds } from '../api/user.controller';
import { getAllRequest, sendRequest } from '../api/friendRequest.controller';
import store from '../store/store';
import { getMyGroups } from '../api/groups.controller';
import { getSearchedFriend } from '../screens/Home/utils/function';

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
  sendRequest(data).then(res => {
    console.log('request sent', JSON.stringify(res));
    getSearchedFriend(email);
  });
};

export const getFriendRequests = async () => {
  store.loadRequests.set(true);
  getAllRequest(store.userData.get()?.uid ?? '').then(res => {
    console.log('get all friends request', JSON.stringify(res));
    store.friendRequests.set(res.data);
    store.loadRequests.set(false);
  });
};

export const getFriends = async () => {
  store.loadFriends.set(true);
  getAllFreinds(store.userData.get()?.uid ?? '').then(res => {
    console.log('get all friends', JSON.stringify(res));
    store.friends.set(res.data);
    store.loadFriends.set(false);
  });
};

export const getGroups = async () => {
  store.loadGroups.set(true);
  getMyGroups(store.userData.get()?.uid ?? '').then(res => {
    console.log('get all groups', JSON.stringify(res));
    store.groups.set(res.data);
    store.loadGroups.set(false);
  });
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
export const fixBrokenURL = (url: string) => {
  // Check if the URL starts with 'https:/' or 'http:/' instead of 'https://' or 'http://'
  if (url.startsWith('https:/') || url.startsWith('http:/')) {
    // Replace 'https:/' or 'http:/' with 'https://' or 'http://'
    url = url.replace(/:\//, '://');
  }
  return url;
};
