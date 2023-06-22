import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
import { HomeNavProps, NavProps } from '../../types';
import { ArrowForward, NYTimesSvg } from '../../assets';
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
          <View
            style={{
              alignSelf: 'flex-start',
              width: '10%',
            }}>
            <Dot show={true} />
            <GapView length={25} />
            <NYTimesSvg width={35} height={35} />
          </View>
          <View
            style={{
              width: '30%',
              // alignSelf: 'flex-start',
            }}>
            <Image
              source={{ uri: 'https://picsum.photos/110/90' }}
              style={{ width: 100, height: 80 }}
            />
          </View>
          <View style={{ width: '55%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar rounded source={{ uri: image }} />
              <GapView mode="horizontal" length={5} />
              <MyText
                children="Jeremy Fischer"
                textStyle={{ fontWeight: 'bold' }}
              />
              <GapView length={15} mode="horizontal" />
              <MyText>{time}</MyText>
            </View>
            <GapView />
            <MyText
              children="Breaking News"
              textStyle={{ fontWeight: 'bold' }}
            />
            <GapView />
            <MyText
              lines={3}
              children="Voluptate consequat sunt ipsum pariatur ut consectetur. Voluptate consequat sunt ipsum pariatur ut consectetur. Voluptate consequat sunt ipsum pariatur ut consectetur."
            />
          </View>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <GapView length={5} />
          <ArrowForward />
        </View>
      </TouchableOpacity>
    </MyCard>
  );
}
