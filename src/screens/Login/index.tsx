import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useHookstate, State } from '@hookstate/core';

import store from '../../store/store';
import { colors } from '../../theme';
import { NormalBtn, GapView } from '../../components';
import { NavProps } from '../../types';
import { _signIn } from './utils/funtions';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const { screenLoading } = useHookstate(store);

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
