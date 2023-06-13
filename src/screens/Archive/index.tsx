import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Dot, MyCanvas, MyCard, MyText, OutlineBtn} from '../../components';
import {Avatar} from '@rneui/themed';

export default function App() {
  return (
    <MyCanvas>
      <View>
        <MyCard>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{alignSelf: 'flex-start', marginTop: 5}}>
              <Image
                source={{uri: 'https://picsum.photos/300/200'}}
                style={{width: 150, height: 100}}
              />
              <Avatar
                rounded
                containerStyle={{
                  borderWidth: 2,
                  bottom: -10,
                  left: 5,
                  position: 'absolute',
                }}
                source={{uri: 'https://randomuser.me/api/portraits/men/22.jpg'}}
              />
              <Avatar
                rounded
                containerStyle={{
                  borderWidth: 2,
                  bottom: -10,
                  left: 30,
                  position: 'absolute',
                }}
                source={{uri: 'https://randomuser.me/api/portraits/men/21.jpg'}}
              />
              <Avatar
                rounded
                containerStyle={{
                  borderWidth: 2,
                  bottom: -10,
                  left: 30 + 25,
                  position: 'absolute',
                }}
                source={{uri: 'https://randomuser.me/api/portraits/men/29.jpg'}}
              />
            </View>
            <View style={{marginLeft: 10, flex: 1, justifyContent: 'center'}}>
              <MyText children="Title" />
              <MyText children="SubTitle" />
              <MyText
                children="Qui deserunt ut ex non irure veniam tempor sunt ipsum cillum?"
                textStyle={{marginTop: 10}}
              />
              <MyText
                children="Archived since 3 days"
                textStyle={{marginVertical: 10, alignSelf: 'flex-end'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <OutlineBtn title="RESTORE" />
              </View>
            </View>
          </View>
        </MyCard>
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
