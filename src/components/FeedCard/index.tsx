import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';

import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
import { Content, NavProps, User } from '../../types';
import { ArrowForward } from '../../assets';
import GapView from '../GapView';
import { transformTime } from '../../utils/globalFunctions';

export default function FeedCard({
  contentData,
  senderData,
}: {
  contentData: Content;
  senderData?: User;
}) {
  const navigation = useNavigation<NavProps['navigation']>();

  return (
    <MyCard>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => Linking.openURL(contentData?.url!)}>
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
            {contentData?.isViewed ? (
              <GapView length={12} />
            ) : (
              <Dot show={true} />
            )}
            <GapView length={25} />
            <Image
              source={{ uri: contentData?.favIcon }}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View
            style={{
              width: '30%',
            }}>
            <Image
              source={{ uri: contentData?.image }}
              style={{ width: 100, height: 80 }}
            />
          </View>
          <View style={{ width: '55%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar rounded source={{ uri: senderData?.image }} />
              <GapView mode="horizontal" length={5} />
              <MyText
                children={senderData?.userName}
                textStyle={{ fontWeight: 'bold' }}
              />
              <GapView length={15} mode="horizontal" />
              <MyText>{transformTime(contentData?.createdAt?.seconds!)}</MyText>
            </View>
            <GapView />
            <MyText
              children={contentData.title}
              textStyle={{ fontWeight: 'bold' }}
            />
            <GapView />
            <MyText lines={3} children={contentData?.description} />
          </View>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <GapView length={5} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                item: { contentData, senderData },
              })
            }>
            <ArrowForward />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MyCard>
  );
}
