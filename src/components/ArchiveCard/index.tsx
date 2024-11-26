import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar } from '@rneui/themed';

import MyCard from '../MyCard';
import MyText from '../MyText';
import { OutlineBtn } from '../Button';
import { Content, User } from '../../types';
import moment from 'moment';
import { colors } from '../../theme';

export default function ArchiveCard({
  contentData,
  senderData,
  onRestore,
}: {
  contentData: Content;
  senderData: User;
  onRestore?: () => void;
}) {
  return (
    <MyCard>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
          <Image
            source={{ uri: contentData?.image }}
            style={{ width: 150, height: 100 }}
          />
          <Avatar
            rounded
            containerStyle={{
              bottom: -10,
              left: 5,
              position: 'absolute',
              backgroundColor: contentData.sender?.image
                ? undefined
                : colors.primary,
            }}
            source={{
              uri: contentData.sender?.image
                ? contentData.sender?.image
                : undefined,
            }}
            title={
              contentData.sender?.image
                ? undefined
                : contentData.sender?.userName?.charAt(0)?.toUpperCase()
            }
          />
          {/* <Avatar
                rounded
                containerStyle={{
                  bottom: -10,
                  left: 30,
                  position: 'absolute',
                }}
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/21.jpg',
                }}
              />
              <Avatar
                rounded
                containerStyle={{
                  bottom: -10,
                  left: 30 + 25,
                  position: 'absolute',
                }}
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/29.jpg',
                }}
              /> */}
        </View>
        <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
          <MyText children={contentData?.title} />
          <MyText
            children={
              contentData?.message == ''
                ? contentData?.description
                : contentData?.message
            }
            textStyle={{ marginTop: 10 }}
          />
          <MyText
            children={moment.unix(contentData?.createdAt?.seconds!).fromNow()}
            textStyle={{ marginVertical: 10, alignSelf: 'flex-end' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <OutlineBtn title="RESTORE" onPress={onRestore} />
          </View>
        </View>
      </View>
    </MyCard>
  );
}
