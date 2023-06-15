import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useHookstate, State } from '@hookstate/core';

import { NormalBtn, GapView } from '../../components';
import { NavProps } from '../../types';
import { _signIn } from './utils/funtions';
import store from '../../store/store';
import { colors } from '../../theme';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const { screenLoading } = useHookstate(store);

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
        onPress={() => _signIn(navigation, screenLoading)}
        icon={<Icon name="logo-google" type="ionicon" color={'#ffffff'} />}
      />
    </View>
  );
};

export default Login;
