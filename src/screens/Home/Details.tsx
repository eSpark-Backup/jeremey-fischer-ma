import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { useTheme, RouteProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Avatar } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';

import { GapView, MyCanvas, MyText, OutlineBtn } from '../../components';
import { Content, HomeStackParamList, NavProps } from '../../types';
import { PostView } from '../../api/postView.controller';
import store from '../../store/store';
import { addToArchive, getAllArchive } from '../../api/archive.controller';
import loaders from '../../store/loaders';
import { getGroups } from '../../utils';

type DetailsScreenRouteProps = RouteProp<HomeStackParamList, 'Details'>;

export default function Details() {
  const navigation = useNavigation<NavProps['navigation']>();
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const userData = useHookstate(store?.userData);
  const contentDetailsStore: any = useHookstate(store?.contentDetails);
  const contentDetails: Content = contentDetailsStore.get();
  const loader = useHookstate(loaders?.contentDetails);
  const { colors } = useTheme();

  useEffect(() => {
    console.log('isViewed', contentDetails?.isViewed);
    if (!contentDetails?.isViewed) {
      markAsSeen();
    }
    getAllArchives();
  }, [contentDetails?.isViewed]);

  async function markAsSeen() {
    loader.set(true);
    const res = await PostView(contentDetails?.id!, userData?.get()?.['uid']!);
    getGroups();
    console.log('res mark as seen', res);
  }

  async function getAllArchives() {
    try {
      loader.set(true);
      const res = await getAllArchive(userData?.get()?.['uid'] ?? '');
      if (res?.data != null) {
        // console.log('kia archive hain', res?.data);
        setIsArchived(
          res?.data.some(item => item?.content?.id === contentDetails?.id),
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
        contentId: contentDetails?.id!,
      });
      console.log('done', res);
      navigation.goBack();
      getGroups();
      contentDetailsStore.set(null);
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
      {loader.get() || contentDetails == null ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <>
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
                  source={{ uri: contentDetails?.image }}
                  style={{ width: 150, height: 100 }}
                />
              </View>
              <View
                style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                <MyText children={contentDetails?.title} />
                <MyText
                  children={contentDetails?.description}
                  textStyle={{ marginTop: 10 }}
                />
                <MyText
                  children={`Shared ${moment
                    .unix(contentDetails?.createdAt?.seconds!)
                    .fromNow()}`}
                  textStyle={{ marginTop: 10 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              rounded
              size={40}
              containerStyle={{
                backgroundColor: contentDetails?.sender?.image
                  ? undefined
                  : colors.primary,
              }}
              source={{
                uri: contentDetails?.sender?.image
                  ? contentDetails?.sender?.image
                  : undefined,
              }}
              title={
                contentDetails?.sender?.image
                  ? undefined
                  : contentDetails?.sender?.userName?.charAt(0)?.toUpperCase()
              }
            />
            <GapView mode="horizontal" />
            <MyText
              lines={1000}
              textStyle={{
                flexWrap: 'wrap',
                width: '80%',
                textAlignVertical: 'center',
              }}>
              {contentDetails?.sender != null
                ? contentDetails?.sender?.userName!
                : 'Deleted User'}
              : {contentDetails?.message != '' ? contentDetails?.message! : ''}
            </MyText>
          </View>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <GapView />
            {isArchived ? (
              <MyText textStyle={{ opacity: 0.5 }} children={'Archived'} />
            ) : (
              <OutlineBtn
                title="Move to Archive"
                onPress={async () => await handleMoveToArchive()}
              />
            )}
          </View>
        </>
      )}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
