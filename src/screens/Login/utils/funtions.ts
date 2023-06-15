import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, ParamListBase} from '@react-navigation/native';


export const _signIn = async (navigation: NavigationProp<ParamListBase>) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    console.log('googleCredential', googleCredential);

    const user_sign = auth().signInWithCredential(googleCredential);
    user_sign
      .then(({user}) => {
        console.log('user', user);
        console.log('navigation', navigation);
        // const data = <User>{
        //   email: user.email,
        //   userName: user.displayName,
        //   image: user.photoURL,
        //   uid: user.uid,
        //   fcmToken: '',
        // };
        // loginUser(data)
        //   .then(userData => navigation.navigate('Tab'))
        //   .catch(err => {
        //     console.log('user', err);
        //   });
          navigation.navigate('Tab')
      })
      .catch(err => {
        console.log('user', err);
      });
  } catch (error: any) {
    console.error(error);
  }
};
