import React from 'react';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import store from '../../store/store';
import { NormalBtn, GapView, MyCanvas, MyText } from '../../components';
import { NavProps } from '../../types';
import { _signIn, _signInWithApp } from './utils/funtions';
import { Apple, Google } from '../../assets';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const { screenLoading } = useHookstate(store);

  async function onAppleButtonPress() {
    // Get an authorizationCode from Apple
    const { authorizationCode } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.REFRESH,
    });

    // Ensure Apple returned an authorizationCode
    if (!authorizationCode) {
      throw new Error(
        'Apple Revocation failed - no authorizationCode returned',
      );
    }

    // Revoke the token
    // return auth().revokeToken(authorizationCode);
  }

  return (
    <MyCanvas
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
      }}>
      <View>
        <MyText textStyle={{ color: '#fff', fontSize: 20 }}>Catch All</MyText>
      </View>
      <GapView length={50} />
      <View>
        <MyText textStyle={{ color: '#fff', fontSize: 20 }}>
          Login to your account
        </MyText>
      </View>
      <GapView length={50} />
      <View style={{ width: '100%' }}>
        <NormalBtn
          title="Sign In with Google"
          btnStyle={{ justifyContent: 'space-between' }}
          onPress={() => _signIn(navigation, screenLoading)}
          icon={<Google width={30} height={30} />}
        />
        <GapView length={20} />
        {Platform.OS == 'ios' ? (
          <NormalBtn
            title="Sign In with Apple"
            btnStyle={{ justifyContent: 'space-between' }}
            onPress={() => _signInWithApp(navigation, screenLoading)}
            icon={<Apple width={30} height={30} />}
          />
        ) : null}
      </View>
    </MyCanvas>
  );
};

export default Login;
