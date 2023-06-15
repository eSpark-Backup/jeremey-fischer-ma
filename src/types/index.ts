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
  isFriend?: boolean;
  Friends?: string[]; // Array of friend UIDs
  Group?: string[]; // Array of GroupIds
  Notifications?: string[]; // Array of notification IDs
};

// FriendRequest type
export type FriendRequest = {
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accept' | 'reject';
  id?: string; // DocId
};

// Content type
export type Content = {
  id?: string; // DocId
  mediaType: 'Audio' | 'Video' | 'Podcast' | 'Article';
  createdAt?: string;
  title: string;
  image: string;
  description: string;
  senderId: string;
  sender?: User;
};

// Group type
export type Group = {
  id?: string; // DocId
  groupName: string;
  Members: string[]; // Array of member UIDs
  groupCreatorId: string;
  groupCreator?: User;
  contents?: string[]; // Array of content IDs
};

// PostView type
export type PostView = {
  id?: string; // DocId
  contentId: string;
  viewerId: string;
};

// NewsFeed type
export type NewsFeed = {
  id?: string; // DocId
  contentId: string;
  senderId: string;
  receiverId: string;
  content: Content;
  sender: User;
  receiver: User;
};
