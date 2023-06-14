import React, {useState} from 'react';
import {StyleSheet, Text, View, SectionList, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CheckBox} from '@rneui/themed';

import {MyCanvas, MyText} from '../../components';

interface ListProps {
  title: string;
  data: {title: string; data: CheckBoxData[]}[];
}

interface CheckBoxData {
  label: string;
  value: boolean;
}

const data: CheckBoxData[] = [
  {label: 'New Articles', value: true},
  {label: 'New Videos', value: false},
  {label: 'New Music', value: false},
  {label: 'New Podcasts', value: true},
];

const List: ListProps[] = [
  {
    title: 'Notifications:',
    data: [
      {
        title: 'Notify me for:',
        data: data,
      },
      {
        title: 'Notify me:',
        data: [
          {label: 'Every Time I recieve new content', value: false},
          {label: 'Once a day at 12:00 pm time', value: false},
        ],
      },
    ],
  },
];

export default function Settings() {
  return (
    <MyCanvas>
      <SettingList data={List} />
    </MyCanvas>
  );
}

const SettingList = ({data}: {data: ListProps[]}) => {
  const [_, setListData] = useState<ListProps[]>();
  const {colors} = useTheme();

  const reMap = (item: CheckBoxData, index: number, index2: number) => {
    console.log('item', item, index, index2);
    let tempData = [...data];
    let tempItem = {...item, value: !item?.value};
    tempData[0].data[index].data[index2] = tempItem;
    setListData([...tempData]);
  };

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => index + item.title}
      renderItem={({item, index}) => (
        <View style={styles.item}>
          <MyText textStyle={styles.nestedTitle}>{item.title}</MyText>
          <FlatList
            data={item.data}
            renderItem={({item, index: index2}) => (
              <View style={styles.nestedItem}>
                <CheckBox
                  center
                  checked={item?.value}
                  checkedColor={colors.primary}
                  containerStyle={{backgroundColor: 'transparent'}}
                  onPress={() => reMap(item, index, index2)}
                />
                <MyText textStyle={{bottom: 1}}>{item.label}</MyText>
              </View>
            )}
          />
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <MyText textStyle={styles.header}>{title}</MyText>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  nestedItem: {
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
  },
  nestedTitle: {
    paddingHorizontal: 10,

    fontSize: 16,
  },
});
