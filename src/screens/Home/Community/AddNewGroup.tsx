import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useHookstate } from '@hookstate/core';

import { CommunityNavProps, User } from '../../../types';
import { colors } from '../../../theme';
import {
  CommunityCard,
  GapView,
  MyCanvas,
  MyText,
  NormalBtn,
  SearchBar,
} from '../../../components';
import store from '../../../store/store';
import { getFriends } from '../../../utils';
import { getSearchedFriend, groupCreation } from '../utils/function';

export default function AddNewGroup() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const friendStore: any = useHookstate(store.friends);
  const friends: User[] = friendStore.get();
  const { loadFriends } = useHookstate(store).get();
  const [groupName, setGroupName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);

  const clearSearch = () => {
    setSearchVal('');
    getFriends();
  };

  const onSelectFriend = (friend: User, isChecked: Boolean) => {
    const index = selectedFriends.findIndex(item => item.uid === friend.uid);
    if (index !== -1 || !isChecked) {
      // The item with the targetId exists in the array, so remove it
      selectedFriends.splice(index, 1);
    } else {
      // The item with the targetId doesn't exist in the array, so add it
      selectedFriends.push(friend);
      selectedFriendIds.push(friend.uid);
    }
    setSelectedFriends([...selectedFriends]);
    setSelectedFriendIds([...selectedFriendIds]);
  };

  const createtheGroup = () => {
    if (groupName && selectedFriendIds.length > 0) {
      groupCreation(groupName, selectedFriendIds, navigation);
    } else {
      Alert.alert('Please type group name or select friend');
    }
  };

  return (
    <MyCanvas>
      <View style={{ alignSelf: 'center', width: '95%' }}>
        <MyText children="Enter Group Name" />
        <GapView />
        <TextInput
          value={groupName}
          style={{
            color: colors.text,
            backgroundColor: colors.card,
            fontFamily: 'DMSans-Regular',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          onChangeText={e => setGroupName(e)}
          placeholder={'Type Group Name'}
          placeholderTextColor={'#ffffff55'}
          underlineColorAndroid="transparent"
        />
      </View>
      <GapView length={30} />
      <View style={{ alignSelf: 'center', width: '100%' }}>
        <MyText
          children="Add Friends to Group"
          textStyle={{ marginLeft: 20 }}
        />
        <GapView />
        <SearchBar
          value={searchVal}
          placeholder="Search by email"
          onChangeText={setSearchVal}
          clearInput={clearSearch}
          onSubmitEditing={() => getSearchedFriend(searchVal)}
        />
      </View>
      {loadFriends ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) =>
            item.isFriend || item.isFriend == undefined ? (
              <CommunityCard
                key={item.uid}
                name={item.userName}
                details={item.email}
                image={item.image}
                checkbox
                checked={Boolean(
                  selectedFriends.filter(val => item.uid == val.uid).length,
                )}
                onChecked={isChecked => onSelectFriend(item, isChecked)}
              />
            ) : (
              <MyText
                textStyle={{ textAlign: 'center', marginTop: 10 }}
                children="No Friends to Show"
              />
            )
          }
          ListEmptyComponent={
            <MyText
              textStyle={{ textAlign: 'center', marginTop: 10 }}
              children="No Friends to Show"
            />
          }
        />
      )}
      <GapView length={20} />
      <NormalBtn
        title="Create Group"
        btnStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '95%',
        }}
        onPress={createtheGroup}
        icon={<Icon name="user-plus" type="font-awesome-5" color={'#ffffff'} />}
      />
      <GapView length={5} />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
