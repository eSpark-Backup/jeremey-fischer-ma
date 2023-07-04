import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import {
  useRoute,
  useTheme,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import moment from 'moment';
import { Avatar } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';

import { GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { HomeStackParamList } from '../../types';
import { PostView } from '../../api/postView.controller';
import store from '../../store/store';
import { addToArchive, getAllArchive } from '../../api/archive.controller';
import loaders from '../../store/loaders';
import { getGroups } from '../../utils';

type DetailsScreenRouteProps = RouteProp<HomeStackParamList, 'Details'>;

export default function Details() {
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const userData = useHookstate(store?.userData);
  const loader = useHookstate(loaders?.contentDetails);
  const { params } = useRoute<DetailsScreenRouteProps>();
  const { colors } = useTheme();
  const {
    item: { contentData, senderData },
  } = params;

  useEffect(() => {
    markAsSeen();
    getAllArchives();
  }, []);

  async function markAsSeen() {
    console.log(contentData?.id, userData?.get()?.['uid']);
    const res = await PostView(contentData?.id!, userData?.get()?.['uid']!);
    contentData.sender ? getGroups() : null;
    console.log('res mark as seen', res);
  }

  async function getAllArchives() {
    try {
      loader.set(true);
      const res = await getAllArchive(userData?.get()?.['uid'] ?? '');
      if (res?.data != null) {
        console.log('kia archive hain', res?.data);
        setIsArchived(
          res?.data.some(item => item?.content?.id === contentData?.id),
        );
        loader.set(false);
      } else {
        console.log('message', res.message);
        loader.set(false);
      }
    } catch (e) {
      console.log('err at newsfeed fetch', e);
      loader.set(false);
    }
  }

  async function handleMoveToArchive() {
    // const ids = store.archiveIds.get();
    // const newIds = [...ids];
    loader.set(true);
    try {
      const res = await addToArchive({
        userId: userData?.get()?.['uid']!,
        contentId: contentData?.id!,
      });
      console.log('done', res);
      loader.set(false);
      contentData.sender ? getGroups() : null;
      getAllArchives();
      // newIds.push(contentData.id!);
      // store.archiveIds.set(newIds);
    } catch (e) {
      console.log('error at add to Archive', e);
      loader.set(false);
    }
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
          {senderData.userName}:
          {contentData?.message != '' ? contentData?.message! : '...'}
        </MyText>
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <GapView />
        {loader.get() ? (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : isArchived ? (
          <MyText textStyle={{ opacity: 0.5 }} children={'Archived'} />
        ) : (
          <OutlineBtn
            title="Move to Archive"
            onPress={async () => await handleMoveToArchive()}
          />
        )}
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
