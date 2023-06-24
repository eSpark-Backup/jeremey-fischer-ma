import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';

import {
  CommunityCard,
  Dropdown,
  LabelBox,
  MyCanvas,
  MyText,
  NormalBtn,
  ScreenLoader,
} from '../../components';
import { Icon } from '@rneui/themed';
import store from '../../store/store';
import { useHookstate } from '@hookstate/core';
import { fixBrokenURL, getContentTypeFromUrl, getFriends } from '../../utils';
import { Content, Group, User } from '../../types';
import { defaultImage } from '../../constants';
import { getGroups } from '../Home/utils/function';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { getLinkPreview } from 'link-preview-js';
import {
  shareContentToGroup,
  shareContentWithFriend,
} from '../../api/content.controller';

const groupData = [
  {
    name: 'Group 1',
    details: '5 Members',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'Group 2',
    details: '3 Members',
    image: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
];

const friendData = [
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

export default function Share() {
  const { colors } = useTheme();
  const route: any = useRoute();
  const navigation = useNavigation();

  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ddSelection, setDdselection] = useState('f');
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(
    undefined,
  );
  const [fetchedData, setFetchedData] = useState<any>();
  const [message, setMessage] = useState<string>('');

  const friendStore: any = useHookstate(store.friends);
  const friends: User[] = friendStore.get();
  const groupsStore: any = useHookstate(store.groups);
  const groups: Group[] = groupsStore.get();
  const userStore: any = useHookstate(store.userData);
  const userData: User = userStore.get();

  useEffect(() => {
    getFriends();
    getGroups();
  }, []);

  useEffect(() => {
    if (ddSelection == 'f') {
      setSelectedGroup(undefined);
    } else {
      setSelectedFriends([]);
    }
  }, [ddSelection]);

  const onSelectFriend = (friend: User, isChecked: Boolean) => {
    const index = selectedFriends.findIndex(item => item.uid === friend.uid);
    if (index !== -1 || !isChecked) {
      // The item with the targetId exists in the array, so remove it
      selectedFriends.splice(index, 1);
    } else {
      // The item with the targetId doesn't exist in the array, so add it
      selectedFriends.push(friend);
    }
    setSelectedFriends([...selectedFriends]);
  };

  const onShare = async () => {
    try {
      setLoader(true);
      const type = await getContentTypeFromUrl(route.params?.url ?? '');
      const linkPreviewData: any = await getLinkPreview(
        fixBrokenURL(route.params?.url) ?? '',
      );
      const obj: Content = {
        mediaType: type,
        title: fetchedData?.title ?? linkPreviewData?.title ?? '',
        description:
          fetchedData?.description ?? linkPreviewData?.description ?? '',
        favIcon: linkPreviewData?.favicons[0] ?? fetchedData?.image?.url ?? '',
        image: fetchedData?.image?.url ?? linkPreviewData?.images[0] ?? '',
        message: message,
        url: fixBrokenURL(route.params?.url),
      };

      if (ddSelection == 'f') {
        if (!Boolean(selectedFriends.length)) {
          setLoader(false);
          Alert.alert('Alert', 'Please select any friend to share content');
        } else {
          const senderId = userData.uid;
          const receiverIds = selectedFriends.map(val => val.uid);
          try {
            await shareContentWithFriend(senderId, receiverIds, obj);

            Alert.alert('Alert', 'Post Share Successfully');
            setLoader(false);
            navigation.goBack();
          } catch (error) {
            setLoader(false);

            console.log('shareContentWithFriend error', error);
          }
        }
      } else {
        if (!Boolean(selectedGroup)) {
          Alert.alert('Alert', 'Please select any group to share content');
          setLoader(false);
        } else {
          const senderId = userData.uid;
          const groupId = selectedGroup?.id;
          try {
            await shareContentToGroup(groupId ?? '', senderId, obj);
            Alert.alert('Alert', 'Post Share Successfully');
            setLoader(false);

            navigation.goBack();
          } catch (error) {
            setLoader(false);

            console.log('shareContentToGroup error', error);
          }
        }
      }
    } catch (error) {}
  };

  return (
    <MyCanvas>
      <ScreenLoader show={loader} />
      <LinkPreview
        onPreviewDataFetched={(data: any) => {
          if (!fetchedData) {
            setFetchedData(data);
          }
        }}
        text={route.params?.url ?? ''}
        renderLinkPreview={() => <></>}
      />
      <View>
        <MyText textStyle={{ fontSize: 18 }}>Send To: </MyText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          flexWrap: 'wrap',
        }}>
        {ddSelection == 'f' ? (
          selectedFriends.map(item => {
            return (
              <LabelBox
                label={item.userName}
                onCross={() => onSelectFriend(item, false)}
              />
            );
          })
        ) : selectedGroup ? (
          <LabelBox
            onCross={() => setSelectedGroup(undefined)}
            label={selectedGroup?.groupName}
          />
        ) : null}
      </View>
      <View style={{ marginVertical: 5 }}>
        <MyText textStyle={{ fontSize: 18 }}>Message: </MyText>
      </View>
      <View
        style={{
          padding: 5,
        }}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter a Message Body with the share content..."
          placeholderTextColor={'#ffffff55'}
          style={{
            color: colors.text,
            fontFamily: 'DMSans-Regular',
            textAlignVertical: 'top',
            borderWidth: 2,
            borderColor: 'grey',
            borderRadius: 5,
            padding: 10,
            minHeight: 100,
          }}
          onChangeText={text => setMessage(text)}
          multiline
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          padding: 5,
          zIndex: 99,
          overflow: 'visible',
        }}>
        <MyText textStyle={{ fontSize: 18 }}>Select: </MyText>
        <Dropdown
          defaultLabel="Friends"
          dataSource={[
            { name: 'Friends', id: 'f' },
            { name: 'Groups', id: 'g' },
          ]}
          toggleValue={dropDownToggle}
          type="sendType"
          handleLabel={val => setDdselection(val?.id!)}
          handleToggle={() => setDropDownToggle(!dropDownToggle)}
        />
      </View>
      <FlatList
        data={
          ddSelection === 'f'
            ? (friends as unknown as ArrayLike<Group & User>)
            : (groups as unknown as ArrayLike<Group & User>)
        }
        showsVerticalScrollIndicator={false}
        renderItem={({
          item,
          index,
        }: {
          item: Group & User;
          index: number;
        }) => {
          if (ddSelection == 'f') {
            return (
              <CommunityCard
                key={index}
                name={item.userName}
                details={`${item.Friends?.length?.toString() ?? '0'} Friends`}
                image={Boolean(item.image) ? item.image : defaultImage}
                checkbox
                checked={Boolean(
                  selectedFriends.filter(val => item.uid == val.uid).length,
                )}
                onChecked={isChecked => onSelectFriend(item, isChecked)}
              />
            );
          } else {
            return (
              <CommunityCard
                key={index}
                name={item.groupName}
                details={`${item.Members?.length?.toString() ?? '0'} Members`}
                image={defaultImage}
                group
                onPress={() => setSelectedGroup(item)}
              />
            );
          }
        }}
      />
      <NormalBtn
        title="Share"
        titleStyle={{ fontSize: 18 }}
        btnStyle={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
          width: '100%',
        }}
        onPress={onShare}
        icon={<Icon name="share" type="font-awesome" color={colors.text} />}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
