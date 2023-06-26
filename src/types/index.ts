import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FakeFeedType } from '../constants';

export type RootStackParamList = {
  Login: undefined;
  Tab: {
    screen: 'Article' | 'Audio' | 'Podcast' | 'Video';
    params?: undefined;
  };
  Details: { item: { senderData: User; contentData: Content } };
  Search: undefined;
  ProfileNav: undefined;
  CommunityNav: undefined;
  Share: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { item: { senderData: User; contentData: Content } };
  FriendsList: undefined;
  GroupsList: undefined;
  GroupDetails: { title: string };
  AddNewGroup: undefined;
  Search: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Archive: undefined;
  Settings: undefined;
};

export type CommunityStackParamList = {
  FriendsList: undefined;
  GroupsList: undefined;
  GroupDetails: { item: { title: string; contents?: Content[] } };
  AddNewGroup: undefined;
};

export type TabNavParamList = {
  Article: undefined;
  Audio: undefined;
  Podcast: undefined;
  Video: undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;

export type HomeNavProps = NativeStackScreenProps<HomeStackParamList>;

export type CommunityNavProps = NativeStackScreenProps<CommunityStackParamList>;

export type ProfileProps = NativeStackScreenProps<
  ProfileStackParamList & RootStackParamList
>;

// User type
export type User = {
  email: string;
  userName: string;
  uid: string;
  image: string;
  fcmToken: string;
  createdAt?: { seconds: number; nanoseconds: number };
  isFriend?: boolean;
  Friends?: string[]; // Array of friend UIDs
  Group?: string[]; // Array of GroupIds
  Notification?: string[]; // Array of notification IDs
  isRequested?: boolean; // only for search friend with current userId
};

// FriendRequest type
export type FriendRequest = {
  senderId: string;
  receiverId: string;
  sender?: User;
  status?: 'pending' | 'accept' | 'reject';
  id?: string; // DocId
};

// Content type
export type Content = {
  id?: string; // DocId
  mediaType: 'Audio' | 'Video' | 'Podcast' | 'Article';
  createdAt?: { seconds: number; nanoseconds: number };
  title: string;
  image: string;
  favIcon: string;
  description: string;
  senderId?: string;
  message: string;
  sender: User;
  url?: string;
  isViewed?: boolean;
  isArchived?: boolean;
};

// Group type
export type Group = {
  id?: string; // DocId
  groupName: string;
  Members: User[]; // Array of member UIDs
  groupCreatorId: string;
  groupCreator?: User;
  contents?: Content[]; // Array of content IDs
};

// PostView type
export type PostView = {
  id?: string; // DocId
  contentId: string;
  userId: string;
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

// Archive type
export type Archive = {
  id?: string;
  userId: string;
  contentId: string;
  user?: User;
  content?: Content;
  createdAt?: string | Date;
};

// GLobalState type
export type GlobalState = {
  userData: null | User;
  screenLoading: boolean;
  loadFriends: boolean;
  friends: User[] | null;
  loadGroups: boolean;
  groups: Group[] | null;
  loadRequests: boolean;
  friendRequests: FriendRequest[] | null;
  newsFeed: NewsFeed[];
  archives: Archive[];
};
