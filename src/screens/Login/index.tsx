import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {NormalBtn, GapView} from '../../components';
import {Icon} from '@rneui/themed';
import {NavProps} from '../../types';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const {colors} = useTheme();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '323035731716-vcf0el7eebonhmpqj90nis6q8gl96rbi.apps.googleusercontent.com',
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('UserInfo', userInfo);
      navigation.navigate('Tab');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View>
        <Text style={{color: '#fff', fontSize: 20}}>LOGO GOES HERE</Text>
      </View>
      <GapView length={50} />
      <View>
        <Text style={{color: '#fff', fontSize: 20}}>Login to your account</Text>
      </View>
      <GapView length={50} />
      <NormalBtn
        title="Login with Google"
        btnStyle={{justifyContent: 'space-between'}}
        onPress={_signIn}
        icon={<Icon name="logo-google" type="ionicon" color={'#ffffff'} />}
      />
    </View>
  );
};

export default Login;
