import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
import { Image } from 'react-native';
import { Avatar } from '@rneui/themed';
import { OutlineBtn } from '../Button';
import { useNavigation } from '@react-navigation/native';
import { HomeNavProps, NavProps } from '../../types';
import { NYTimesSvg } from '../../assets';
import GapView from '../GapView';
import { fakeFeedData } from '../../constants';

export default function FeedCard({
  date,
  image,
  time,
}: {
  date?: string;
  image: string;
  time: string;
}) {
  const navigation = useNavigation<NavProps['navigation']>();
  return (
    <MyCard>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() =>
          navigation.navigate('Details', { item: fakeFeedData[0] })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Dot show={true} />
          <MyText>{time}</MyText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <NYTimesSvg width={35} height={35} />
          <GapView mode="horizontal" length={5} />
          <Image
            source={{ uri: 'https://picsum.photos/300/200' }}
            style={{ width: 120, height: 90 }}
          />
          <GapView mode="horizontal" length={10} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                containerStyle={{
                  borderWidth: 2,
                }}
                source={{ uri: image }}
              />
              <GapView mode="horizontal" length={5} />
              <MyText
                children="Jeremy Fischer"
                textStyle={{ fontWeight: 'bold' }}
              />
            </View>
            <GapView />
            <MyText
              children="Breaking News"
              textStyle={{ fontWeight: 'bold' }}
            />
            <GapView />
            <MyText
              children="Qui deserunt ut ex non irure veniam tempor sunt ipsum cillum?"
              textStyle={{ width: '55%' }}
            />
          </View>
        </View>
        {/* <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
              rounded
              containerStyle={{
                borderWidth: 2,
                // bottom: -10,
                // left: 5,
                // position: 'absolute',
              }}
              source={{ uri: image }}
            />
            <MyText children="Title" />
          </View>
          <MyText children="Breaking News" />
          <MyText
            children="Qui deserunt ut ex non irure veniam tempor sunt ipsum cillum?"
            textStyle={{ marginTop: 20 }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <OutlineBtn title="READ" btnStyle={{ marginRight: 15 }} />
            <MyText>{time}</MyText>
          </View>
        </View> */}
      </TouchableOpacity>
    </MyCard>
  );
}

const styles = StyleSheet.create({});
