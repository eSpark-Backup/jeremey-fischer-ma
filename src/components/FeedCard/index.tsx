import React from 'react';
import { TouchableOpacity, View, Image, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';

import MyText from '../MyText';
import Dot from '../Dot';
import MyCard from '../MyCard';
import { Content, NavProps, User } from '../../types';
import { ArrowForward } from '../../assets';
import GapView from '../GapView';
import { transformTime } from '../../utils/globalFunctions';
import store from '../../store/store';
import { getContentDetails } from '../../utils';
import { colors } from '../../theme';
import { deletedUser } from '../../constants';

export default function FeedCard({
  contentData,
  senderData,
  groupId,
  unreadComments,
  recieverData,
}: {
  contentData: Content;
  groupId?: string;
  senderData?: User;
  unreadComments?: boolean;
  recieverData?: User;
}) {
  const navigation = useNavigation<NavProps['navigation']>();

  return (
    <MyCard>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={async () => {
          await getContentDetails(contentData?.id!);
          navigation.navigate('Details', {
            item: { contentData, senderData, groupId, recieverData },
          });
        }}>
        {!contentData?.isViewed &&
          contentData?.senderId != store.userData.get()?.uid && (
            <View style={{ position: 'absolute', top: 12, left: 10 }}>
              <Dot show={true} />
            </View>
          )}
        {unreadComments !== undefined && unreadComments == false && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                Unread comments
              </MyText>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={{ uri: contentData?.favIcon }}
              style={{ width: 25, height: 25 }}
            />
            <Image
              source={{ uri: contentData?.image }}
              style={{ width: 100, height: 80 }}
            />
          </View>
          <View style={{ width: '55%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {senderData != null ? (
                  <Avatar
                    containerStyle={{
                      backgroundColor: senderData?.image
                        ? undefined
                        : colors.primary,
                    }}
                    rounded
                    source={
                      senderData?.image ? { uri: senderData?.image } : undefined
                    }
                    title={
                      senderData?.image
                        ? undefined
                        : senderData?.userName?.charAt(0)?.toUpperCase()
                    }
                  />
                ) : (
                  <Avatar
                    rounded
                    source={{
                      uri: deletedUser,
                    }}
                  />
                )}

                <GapView mode="horizontal" length={5} />
                <MyText
                  children={
                    senderData != null ? senderData?.userName : 'Deleted User'
                  }
                  textStyle={{ fontWeight: 'bold' }}
                />
              </View>
              <MyText>{transformTime(contentData?.createdAt?.seconds!)}</MyText>
            </View>
            <GapView />
            <MyText
              children={contentData?.title}
              textStyle={{ fontWeight: 'bold' }}
            />
            <GapView />
            <MyText
              lines={3}
              children={contentData?.message ?? contentData?.description}
            />
          </View>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <GapView length={5} />
          <TouchableOpacity
            disabled
            onPress={() => {
              navigation.navigate('Details', {
                item: { contentData, senderData },
              });
              getContentDetails(contentData?.id!);
            }}>
            <ArrowForward />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MyCard>
  );
}
