import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {NormalBtn, GapView} from '../../components';
import {Icon} from '@rneui/themed';
import {NavProps} from '../../types';

const Login = () => {
  const navigation = useNavigation<NavProps['navigation']>();
  const {colors} = useTheme();

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
        onPress={() => navigation.navigate('Tab')}
        icon={<Icon name="logo-google" type="ionicon" color={'#ffffff'} />}
      />
    </View>
  );
};

export default Login;
