/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// @ts-ignore
import ShareMenu from 'react-native-share-menu';
import { RootNav } from './src/navigation';

function App(): JSX.Element {
  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  const handleShare = useCallback((item?: any) => {
    if (!item) {
      return;
    }
    Linking.openURL('seaglass://share');
    // You can receive extra data from your custom Share View
    console.log(item);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
