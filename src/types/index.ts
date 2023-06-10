import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Tab: undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;
