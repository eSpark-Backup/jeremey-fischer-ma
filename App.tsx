/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RootNav} from './src/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <RootNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
