import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FakeFeedType } from '../constants';

export type RootStackParamList = {
  Login: undefined;
  Tab: undefined;
  Share: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { item: FakeFeedType };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;

export type HomeNavProps = NativeStackScreenProps<HomeStackParamList>;

// User type
export type User = {
  email: string;
  userName: string;
  uid: string;
  image: string;
  fcmToken: string;
  createdAt?: string;
  Friends?: string[]; // Array of friend UIDs
  Group?: string[]; // Array of GroupIds
  Notifications?: string[]; // Array of notification IDs
};

// FriendRequest type
export type FriendRequest = {
  senderId: string;
  receiverId: string;
  status: string;
};

// Content type
export type Content = {
  contentId: string;
  mediaType: string;
  createdAt: string;
  title: string;
  image: string;
  description: string;
  channel: string;
  duration: number;
  artist: string;
  album: string;
  author: string;
};

// Group type
export type Group = {
  groupName: string;
  Members: string[]; // Array of member UIDs
  groupCreator: string;
  contents: string[]; // Array of content IDs
};

// PostView type
export type PostView = {
  contentId: string;
  viewerId: string;
};

// NewsFeed type
export type NewsFeed = {
  contentId: string;
  senderId: string;
  receiverId: string;
};
