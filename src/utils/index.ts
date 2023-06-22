import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { State } from '@hookstate/core';
import { FriendRequest, User } from '../types';
import { getAllFreinds } from '../api/user.controller';
import { getAllRequest, sendRequest } from '../api/friendRequest.controller';

export const disableBackButton = () => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  return () => backHandler.remove();
};

export const getUserData = async () => {
  const jsonValue = await AsyncStorage.getItem('@userData');
  console.log('jsonValue', jsonValue);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const storeUserData = async (
  value: FirebaseFirestoreTypes.DocumentData | null | undefined,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const AddFriend = async () => {
  const data = <FriendRequest>{
    senderId: '1686658085577',
    receiverId: 'ZGjV9vm1NlSWoZouyk28w8XELDs1',
    status: 'pending',
  };
  sendRequest(data).then(res => {
    console.log('request sent', JSON.stringify(res));
  });
};

export const getFriendRequests = async (
  loadRequests: State<boolean, {}>,
  friendRequests: State<FriendRequest[] | null, {}>,
) => {
  loadRequests.set(true);
  getAllRequest('ZGjV9vm1NlSWoZouyk28w8XELDs1').then(res => {
    console.log('get all friends request', JSON.stringify(res));
    friendRequests.set(res.data);
    loadRequests.set(false);
  });
};
export const getFriends = async (
  loadFriends: State<boolean, {}>,
  friends: State<User[] | null, {}>,
) => {
  loadFriends.set(true);
  getAllFreinds('1686658085577').then(res => {
    console.log('get all friends', JSON.stringify(res));
    friends.set(res.data);
    loadFriends.set(false);
  });
};
