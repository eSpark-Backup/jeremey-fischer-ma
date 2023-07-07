import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';

import store from '../../store/store';
import { NormalBtn, GapView, MyCanvas, MyText } from '../../components';
import { NavProps } from '../../types';
import { _signIn } from './utils/funtions';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const { screenLoading } = useHookstate(store);

  return (
    <MyCanvas
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View>
        <MyText textStyle={{ color: '#fff', fontSize: 20 }}>Seaglass</MyText>
      </View>
      <GapView length={50} />
      <View>
        <MyText textStyle={{ color: '#fff', fontSize: 20 }}>
          Login to your account
        </MyText>
      </View>
      <GapView length={50} />
      <NormalBtn
        title="Login with Google"
        btnStyle={{ justifyContent: 'space-between' }}
        onPress={() => _signIn(navigation, screenLoading)}
        icon={<Icon name="logo-google" type="ionicon" color={'#ffffff'} />}
      />
    </MyCanvas>
  );
};

export default Login;
