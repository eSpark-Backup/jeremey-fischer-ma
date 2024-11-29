import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Tab: {
    screen: 'Article' | 'Audio' | 'Podcast' | 'Video';
    params?: undefined;
  };
  Details: { item: { senderData?: User; contentData: Content, groupId?:string } };
  Search: undefined;
  ProfileNav: undefined;
  Inbox: undefined;
  CommunityNav: undefined;
  Share: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { item: { senderData: User; contentData: Content, groupId?:string } };
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
  CommunityTab: { title?: string | undefined };
  // FriendsList: undefined;
  // GroupsList: undefined;
  GroupDetails: { title?: string | undefined; groupId: string | undefined };
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

// Welcome Screen Slides type
export type Slides = {
  key: number;
  image: ImageSourcePropType;
};

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
  NotificationSetting?: NotificationSetting;
  signWith?: 'Google' | 'Apple';
};

export type FriendRequest = {
  senderId: string;
  receiverId: string;
  sender?: User;
  status?: 'pending' | 'accept' | 'reject';
  id?: string; // DocId
};

export type Comment = {
  id: string |null;
  contentID?: string |null;
  senderID: string;
  receiverGroupId?: string | null;
  receiverId?: string | null;
  userName: string;
  message: string;
  createdAt?: Date |  { seconds: number; nanoseconds: number };
  replies?: Reply[] | null;
};
export type Reply = {
  id: string;
  commentID:string;
  senderID:string
  userName: string;
  message: string;
  createdAt?: Date|  { seconds: number; nanoseconds: number };
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
  sender?: User;
  url?: string;
  isCommentViewed?: boolean;
  isViewed?: boolean;
  isArchived?: boolean;
};

// Group type
export type Group = {
  id?: string; // DocId
  groupName: string;
  Members: User[] | string[]; // Array of member UIDs
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
  userData: User | FirebaseFirestoreTypes.DocumentData | null | undefined;
  screenLoading: boolean;
  dataLoading: boolean;
  loadFriends: boolean;
  friends: User[] | null;
  loadGroups: boolean;
  userGroups: Group[] | null;
  groups: Group[] | null;
  groupContent: Content[] | null;
  loadRequests: boolean;
  friendRequests: FriendRequest[] | null;
  comments: Comment[];
  newsFeed: NewsFeed[];
  archives: Archive[];
  archiveIds: string[];
  currentUserNotificationSetting: NotificationSetting | null;
  articles: NewsFeed[];
  audios: NewsFeed[];
  podcasts: NewsFeed[];
  videos: NewsFeed[];
  fcmToken: string | null;
  contentDetails: Content | null;
  hideSearchFAB: boolean;
};

// Notification Settings
export type NotificationSetting = {
  whenReceivedNewArticle: boolean;
  whenReceivedNewMusic: boolean;
  whenReceivedNewVideo: boolean;
  whenReceivedNewPodcast: boolean;
  all: boolean;
};
