import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';

import {Dot, GapView, MyCanvas, MyText, OutlineBtn} from '../../components';
import {HomeNavProps} from '../../types';
import {Avatar} from '@rneui/themed';

export default function Details() {
  const route = useRoute<HomeNavProps['route']>();
  const {colors} = useTheme();
  return (
    <MyCanvas>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignSelf: 'flex-start', marginTop: 5}}>
            <Image
              source={{uri: 'https://picsum.photos/300/200'}}
              style={{width: 150, height: 100}}
            />
          </View>
          <View style={{marginLeft: 10, flex: 1, justifyContent: 'center'}}>
            <MyText children="Title" />
            <MyText children="SubTitle" />
            <MyText
              children="Qui deserunt ut ex non irure veniam tempor sunt ipsum cillum?"
              textStyle={{marginTop: 10}}
            />
            <MyText children="Shared 3 hours ago" textStyle={{marginTop: 10}} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Avatar
          rounded
          size={40}
          containerStyle={{
            borderWidth: 2,
            borderColor: colors.primary,
          }}
          source={{uri: 'https://randomuser.me/api/portraits/men/22.jpg'}}
        />
        <GapView mode="horizontal" />
        <MyText lines={3} textStyle={{flexWrap: 'wrap', width: '80%'}}>
          John Doe: Occaecat occaecat veniam reprehe aliqua.
        </MyText>
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <OutlineBtn title="Watch" />
        <GapView />
        <OutlineBtn title="Mark as Seen" />
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
