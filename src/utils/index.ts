import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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
  // error reading value
};

export const storeUserData = async (
  value: FirebaseFirestoreTypes.DocumentData | null | undefined,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * @param {url} url of a content to check its type
 * @returns {type} return type wheter it `music`, `video`, `podcast` or `article`
 */
export const getContentTypeFromUrl = async (url: string) => {
  try {
    if (/spotify.*\/track|spotify.*\/album/.test(url)) {
      return 'Music';
    } else if (/tidal/.test(url)) {
      return 'Music';
    } else if (/music\.apple/.test(url)) {
      return 'Music';
    } else if (/deezer/.test(url)) {
      return 'Music';
    } else if (/pandora/.test(url)) {
      return 'Music';
    } else if (/amazon\.com\/music/.test(url)) {
      return 'Music';
    } else if (/music\.youtube/.test(url)) {
      return 'Music';
    } else if (/soundcloud/.test(url)) {
      return 'Music';
    } else if (/youtube/.test(url)) {
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
      return 'Podcasts';
    } else if (/podcasts\.apple/.test(url)) {
      return 'Podcasts';
    } else if (/stitcher/.test(url)) {
      return 'Podcasts';
    } else {
      return 'Article';
    }
  } catch (error) {
    console.log('getContentTypeFromUrl error', error);
    return 'Article';
  }
};
