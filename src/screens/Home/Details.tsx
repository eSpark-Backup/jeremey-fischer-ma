import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {
  useRoute,
  useTheme,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import moment from 'moment';
import { Avatar } from '@rneui/themed';

import { GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { HomeStackParamList } from '../../types';
import { PostView } from '../../api/postView.controller';
import { useHookstate } from '@hookstate/core';
import store from '../../store/store';

type DetailsScreenRouteProps = RouteProp<HomeStackParamList, 'Details'>;

export default function Details() {
  const userData = useHookstate(store?.userData);
  const { params } = useRoute<DetailsScreenRouteProps>();
  const { colors } = useTheme();
  const {
    item: { contentData, senderData },
  } = params;

  useEffect(() => {
    markAsSeen();
  }, []);

  async function markAsSeen() {
    console.log(contentData?.id, userData?.get()?.['uid']);
    const res = await PostView(contentData?.id!, userData?.get()?.['uid']!);
    console.log('res mark as seen', res);
  }

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
        <OutlineBtn
          title="Move to Archive"
          // onPress={() => handleMoveToArchive()}
        />
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
