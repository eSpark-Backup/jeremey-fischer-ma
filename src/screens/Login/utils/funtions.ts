import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { State } from '@hookstate/core';
import {
  AppleRequestResponse,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import { Buffer } from 'buffer';

import { User } from '../../../types';
import { loginUser } from '../../../api/user.controller';
import { getFCMToken, storeRefreshToken, storeUserData } from '../../../utils';
import store from '../../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const revokeUserToken = async (token: string) => {
  try {
    if (token) {
      const url = `https://us-central1-seaglass-app.cloudfunctions.net/revokeToken?refresh_token=${token}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.text(); // Parse the response as text
        })
        .then(refreshToken => {
          console.log('refreshToken', refreshToken);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  } catch (error) {
    console.error('Error revoking token:', error);
  }
};

const getRefreshToken = (appleIDCredential: AppleRequestResponse) => {
  const authorizationCode = appleIDCredential.authorizationCode;
  console.log(
    'appleIDCredential.authorizationCode',
    appleIDCredential.authorizationCode,
  );

  const url = `https://us-central1-seaglass-app.cloudfunctions.net/getRefreshToken?code=${authorizationCode}`;

  console.log('url', url);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.text(); // Parse the response as text
    })
    .then(refreshToken => {
      console.log('refreshToken', refreshToken);
      storeRefreshToken(refreshToken);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
};

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
    const user_sign = auth().signInWithCredential(googleCredential);
    user_sign
      .then(({ user }) => {
        console.log('user sign', user);
        const data = <User>{
          email: user.email,
          userName: user.displayName,
          image: user.photoURL,
          uid: user.uid,
          fcmToken: fcmToken ?? '',
        };
        getFCMToken().then(res => {
          console.log('fcmToken', fcmToken, 'res', res);
        });
        loginUser(data)
          .then(({ data }) => {
            storeUserData({ ...data, signWith: 'Google' });
            screenLoading.set(false);
            navigation.navigate('Tab');
            store.userData.set({ ...data, signWith: 'Google' });
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
export const _signInWithApp = async (
  navigation: NavigationProp<ParamListBase>,
  screenLoading: State<boolean, {}>,
) => {
  try {
    screenLoading.set(true);
    // Start the sign-in request
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log(
      'appleAuthRequestResponse.identityToken Code',
      appleAuthRequestResponse.authorizationCode,
    );

    getRefreshToken(appleAuthRequestResponse);

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('Apple res', appleAuthRequestResponse);

    const displayName = appleAuthRequestResponse.fullName?.givenName;

    // Sign the user in with the credential
    const user_sign = auth().signInWithCredential(appleCredential);
    user_sign
      .then(({ user }) => {
        console.log('user sign', user);
        console.log('user provider', user.providerData[0]);
        const data = <User>{
          email: user.providerData[0].email,
          userName: displayName,
          image: user.photoURL,
          uid: user.uid,
          fcmToken: fcmToken ?? '',
        };
        getFCMToken().then(res => {
          console.log('fcmToken', fcmToken, 'res', res);
        });
        loginUser(data)
          .then(({ data }) => {
            storeUserData({ ...data, signWith: 'Apple' });
            screenLoading.set(false);
            navigation.navigate('Tab');
            store.userData.set({ ...data, signWith: 'Apple' });
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
