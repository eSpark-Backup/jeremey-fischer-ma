import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';

import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
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
            backgroundColor: 'pink',
          }}>
          <View style={{ alignSelf: 'flex-start', width: '10%' }}>
            <Dot show={true} />
            <NYTimesSvg width={35} height={35} />
          </View>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
            }}>
            <GapView mode="horizontal" length={5} />
            <Image
              source={{ uri: 'https://picsum.photos/100/80' }}
              style={{ width: 100, height: 80 }}
            />
            <GapView mode="horizontal" length={10} />
            <View style={{ flexWrap: 'wrap' }}>
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
                lines={3}
                children="Voluptate consequat sunt ipsum pariatur ut consectetur."
                // textStyle={{
                //   width: '45%',
                // }}
              />
            </View>
          </View>
          <MyText textStyle={{ alignSelf: 'flex-start' }}>{time}</MyText>
        </View>
      </TouchableOpacity>
    </MyCard>
  );
}
