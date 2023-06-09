/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Login} from './src/screens';
import {View, SafeAreaView} from 'react-native';
import {themeColor} from './src/constants';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: themeColor.primary}}>
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
