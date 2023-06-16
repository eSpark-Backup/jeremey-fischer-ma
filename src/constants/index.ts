import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');
export { width as SCREEN_WIDTH, height as SCREEN_HEIGHT };

export const FontFamily =
  Platform.OS == 'ios' ? 'Verdana' : 'sans-serif-medium';

const date = new Date();

export const fakeFeedData: FakeFeedType[] = [
  {
    id: 1,
    title: '',
    description: '',
    seen: false,
    imageURI: '',
    senders: [
      { id: 1, name: 'John Doe', imageURI: '' },
      { id: 2, name: 'Adam Wish', imageURI: '' },
    ],
    timeStamp: date,
    mediaType: 'Audio',
  },
];

export type FakeFeedType = {
  id: number;
  title: string;
  description: string;
  seen: boolean;
  imageURI: string;
  senders: { id: number; name: string; imageURI: string }[];
  timeStamp: Date;
  mediaType: 'Audio' | 'Video' | 'Podcast' | 'Article';
};
