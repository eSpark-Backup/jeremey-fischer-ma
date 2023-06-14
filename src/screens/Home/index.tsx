import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Avatar} from '@rneui/themed';

import {
  Dot,
  GapView,
  MyCanvas,
  MyCard,
  MyText,
  OutlineBtn,
} from '../../components';
import {FakeFeedType, fakeFeedData} from '../../constants';
import {HomeNavProps, NavProps} from '../../types';

export default function App() {
  return (
    <MyCanvas>
      <MyFeed />
    </MyCanvas>
  );
}

const MyFeed = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<HomeNavProps['navigation']>();
  const renderFeedList = ({
    item,
    index,
  }: {
    item: FakeFeedType;
    index: number;
  }) => {
    return (
      <View>
        <MyText
          textStyle={{
            alignSelf: 'flex-end',
            marginVertical: 5,
            fontWeight: 'bold',
          }}>
          -- today --
        </MyText>
        <MyCard>
          <TouchableOpacity
            style={{flexDirection: 'row', padding: 10}}
            onPress={() => navigation.navigate('Details', {item})}>
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
                textStyle={{marginTop: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <OutlineBtn title="READ" />
                <MyText textStyle={{right: -15}}>3h</MyText>
              </View>
            </View>
            <Dot show={true} />
          </TouchableOpacity>
        </MyCard>
      </View>
    );
  };

  return (
    <View>
      <MyText>What your friends are reading:</MyText>
      <GapView />
      <FlatList data={fakeFeedData} renderItem={renderFeedList} />
    </View>
  );
};

const styles = StyleSheet.create({});
