import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { State } from '@hookstate/core';

import { User } from '../../../types';
import { loginUser } from '../../../api/user.controller';
import { storeUserData } from '../../../utils';
import store from '../../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const _signIn = async (
  navigation: NavigationProp<ParamListBase>,
  screenLoading: State<boolean, {}>,
) => {
  try {
    screenLoading.set(true);
    await GoogleSignin.hasPlayServices();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    console.log('chala kia');

    const user_sign = auth().signInWithCredential(googleCredential);
    console.log('chala kia 2');
    user_sign
      .then(({ user }) => {
        console.log('chala kia 3');
        const data = <User>{
          email: user.email,
          userName: user.displayName,
          image: user.photoURL,
          uid: user.uid,
          fcmToken: fcmToken ?? '',
        };

        loginUser(data)
          .then(({ data }) => {
            storeUserData(data);
            screenLoading.set(false);
            navigation.navigate('Tab');
            store.userData.set(data);
          })
          .catch(err => {
            console.log('user', err);
            screenLoading.set(false);
          });
      })
      .catch(err => {
        console.log('user', err);
        screenLoading.set(false);
      });
  } catch (error: any) {
    console.error(error);
    screenLoading.set(false);
  }
};
