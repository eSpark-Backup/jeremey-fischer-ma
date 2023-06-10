import React from 'react';
import {View, Text} from 'react-native';
import {Button, GapView} from '../../components';
import {themeColor} from '../../constants';

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColor.background,
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
      <Button title="Login with Google" />
    </View>
  );
};

export default Login;
