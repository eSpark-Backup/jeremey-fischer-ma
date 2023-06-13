import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {FakeFeedType} from '../constants';

export type RootStackParamList = {
  Login: undefined;
  Tab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: {item: FakeFeedType};
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;

export type HomeNavProps = NativeStackScreenProps<HomeStackParamList>;
