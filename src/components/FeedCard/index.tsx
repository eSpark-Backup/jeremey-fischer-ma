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
  favIcon,
  senderName,
  senderImage,
  title,
  description,
}: {
  date?: string;
  image?: string;
  time: string;
  favIcon?: string;
  senderName?: string;
  senderImage?: string;
  title?: string;
  description?: string;
}) {
  const navigation = useNavigation<NavProps['navigation']>();
  return (
    <MyCard>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => console.log('redirect to link')}>
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
            {favIcon ? (
              <Image
                source={{ uri: favIcon }}
                style={{ width: 35, height: 35 }}
              />
            ) : (
              <NYTimesSvg width={35} height={35} />
            )}
          </View>
          <View
            style={{
              width: '30%',
            }}>
            <Image
              source={{
                uri: image ?? 'https://picsum.photos/110/90',
              }}
              style={{ width: 100, height: 80 }}
            />
          </View>
          <View style={{ width: '55%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                source={{
                  uri:
                    senderImage ??
                    'https://randomuser.me/api/portraits/men/22.jpg',
                }}
              />
              <GapView mode="horizontal" length={5} />
              <MyText
                children={senderName ?? 'Jeremy Fischer'}
                textStyle={{ fontWeight: 'bold' }}
              />
              <GapView length={15} mode="horizontal" />
              <MyText>{time}</MyText>
            </View>
            <GapView />
            <MyText
              children={title ?? 'Breaking News'}
              textStyle={{ fontWeight: 'bold' }}
            />
            <GapView />
            <MyText
              lines={3}
              children={
                description ??
                'Voluptate consequat sunt ipsum pariatur ut consectetur. Voluptate consequat sunt ipsum pariatur ut consectetur. Voluptate consequat sunt ipsum pariatur ut consectetur.'
              }
            />
          </View>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <GapView length={5} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { item: fakeFeedData[0] })
            }>
            <ArrowForward />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MyCard>
  );
}
