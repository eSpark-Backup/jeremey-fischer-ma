import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Avatar } from '@rneui/base';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Divider, Icon } from '@rneui/themed';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useHookstate } from '@hookstate/core';

import { GapView, MyCanvas, MyText, NormalBtn } from '../../components';
import { SCREEN_WIDTH } from '../../constants';
import { ProfileProps } from '../../types';
import { storeUserData } from '../../utils';
import { ArchiveOutlineSvg } from '../../assets';
import store from '../../store/store';
import moment from 'moment';

export default function App() {
  const userData = useHookstate(store?.userData)?.get();
  const navigation = useNavigation<ProfileProps['navigation']>();
  const { colors } = useTheme();

  const onLogout = () => {
    Alert.alert('Hold on!', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: signOut },
    ]);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      storeUserData(null);
      store.articles.set([]);
      store.audios.set([]);
      store.podcasts.set([]);
      store.videos.set([]);
      store.currentUserNotificationSetting.set(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MyCanvas style={{ justifyContent: 'space-between' }}>
      <View style={{ alignItems: 'center' }}>
        <Avatar
          rounded
          containerStyle={{ borderWidth: 0.6, borderColor: 'grey' }}
          source={{
            uri: userData?.image
              ? userData?.image
              : 'https://randomuser.me/api/portraits/men/36.jpg',
          }}
          size={120}
        />
        <MyText textStyle={{ fontWeight: 'bold', fontSize: 24, marginTop: 10 }}>
          {userData?.userName}
        </MyText>
        <MyText textStyle={{ fontWeight: 'bold', marginTop: 10, opacity: 0.5 }}>
          {`Member for ${moment
            .unix(userData?.createdAt?.seconds!)
            .fromNow(true)}`}
        </MyText>
        <View>
          <Divider
            color="#000"
            width={2}
            style={{ width: SCREEN_WIDTH * 0.9, height: 10, opacity: 0.1 }}
          />
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <MyText textStyle={{ fontWeight: 'bold', opacity: 0.5 }}>
            Signed in with
          </MyText>
          <GapView mode="horizontal" />
          <Icon
            name={'logo-google'}
            type="ionicon"
            style={{ opacity: 0.2 }}
            color={colors.text}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <NormalBtn
          title="View Archive"
          btnStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
          onPress={() => navigation.navigate('Archive')}
          icon={
            <ArchiveOutlineSvg color={colors.text} width={25} height={25} />
          }
        />
        <NormalBtn
          title="Settings"
          btnStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
          onPress={() => navigation.navigate('Settings')}
          icon={
            <Icon name="settings-outline" type="ionicon" color={'#ffffff'} />
          }
        />
        <NormalBtn
          title="Log out Account"
          btnStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
          onPress={onLogout}
          icon={<Icon name="log-out" type="feather" color={'#ffffff'} />}
        />
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
