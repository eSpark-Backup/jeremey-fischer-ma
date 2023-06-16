import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
import { Image } from 'react-native';
import { Avatar } from '@rneui/themed';
import { OutlineBtn } from '../Button';
import { useNavigation } from '@react-navigation/native';
import { HomeNavProps } from '../../types';

export default function FeedCard({
  date,
  image,
  time,
}: {
  date?: string;
  image: string;
  time: string;
}) {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  return (
    <View>
      {date && (
        <MyText
          children={`-- ${date} --`}
          textStyle={{
            alignSelf: 'flex-end',
            marginVertical: 5,
            fontWeight: 'bold',
          }}
        />
      )}
      <MyCard>
        <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
            <Image
              source={{ uri: 'https://picsum.photos/300/200' }}
              style={{ width: 150, height: 100 }}
            />
            <Avatar
              rounded
              containerStyle={{
                borderWidth: 2,
                bottom: -10,
                left: 5,
                position: 'absolute',
              }}
              source={{ uri: image }}
            />
          </View>
          <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
            <MyText children="Title" />
            <MyText children="SubTitle" />
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
          </View>
        </TouchableOpacity>
      </MyCard>
    </View>
  );
}

const styles = StyleSheet.create({});
