import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useRoute, useTheme, RouteProp } from '@react-navigation/native';
import moment from 'moment';

import { Dot, GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { HomeNavProps, HomeStackParamList } from '../../types';
import { Avatar } from '@rneui/themed';

type DetailsScreenRouteProps = RouteProp<HomeStackParamList, 'Details'>;

export default function Details() {
  const { params } = useRoute<DetailsScreenRouteProps>();
  const { colors } = useTheme();
  const {
    item: { contentData, senderData },
  } = params;
  return (
    <MyCanvas>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
            <Image
              source={{ uri: contentData?.image }}
              style={{ width: 150, height: 100 }}
            />
          </View>
          <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
            <MyText children={contentData?.title} />
            <MyText
              children={contentData?.description}
              textStyle={{ marginTop: 10 }}
            />
            <MyText
              children={`Shared ${moment
                .unix(contentData.createdAt?.seconds!)
                .fromNow()}`}
              textStyle={{ marginTop: 10 }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Avatar rounded size={40} source={{ uri: senderData.image }} />
        <GapView mode="horizontal" />
        <MyText
          lines={3}
          textStyle={{
            flexWrap: 'wrap',
            width: '80%',
            textAlignVertical: 'center',
          }}>
          {senderData.userName}:{' '}
          {contentData?.message != '' ? contentData?.message! : '...'}
        </MyText>
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <GapView />
        <OutlineBtn title="Move to Archive" />
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
