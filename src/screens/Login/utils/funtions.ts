import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { User } from '../../../types';
import { loginUser } from '../../../api/user.controller';
import { storeUserData } from '../../../utils';
import { State } from '@hookstate/core';
export const _signIn = async (
  navigation: NavigationProp<ParamListBase>,
  screenLoading: State<boolean, {}>,
) => {
  try {
    screenLoading.set(true);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const user_sign = auth().signInWithCredential(googleCredential);
    user_sign
      .then(({ user }) => {
        const data = <User>{
          email: user.email,
          userName: user.displayName,
          image: user.photoURL,
          uid: user.uid,
          fcmToken: '',
        };
        loginUser(data)
          .then(({ data }) => {
            storeUserData(data);
            screenLoading.set(false);
            navigation.navigate('Tab');
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
