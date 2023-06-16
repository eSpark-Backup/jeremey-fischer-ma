import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Icon } from '@rneui/themed';

import { NormalBtn, GapView } from '../../components';
import { NavProps } from '../../types';
import { _signIn } from './utils/funtions';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const { colors } = useTheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '213956113520-4e23h6t7tc4279r64t5r0vdrmt5j80va.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View>
        <Text style={{ color: '#fff', fontSize: 20 }}>LOGO GOES HERE</Text>
      </View>
      <GapView length={50} />
      <View>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          Login to your account
        </Text>
      </View>
      <GapView length={50} />
      <NormalBtn
        title="Login with Google"
        btnStyle={{ justifyContent: 'space-between' }}
        onPress={() => _signIn(navigation)}
        icon={<Icon name="logo-google" type="ionicon" color={'#ffffff'} />}
      />
    </View>
  );
};

export default Login;
