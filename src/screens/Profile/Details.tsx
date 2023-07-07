import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { MyCanvas, MyText } from '../../components';
import { TouchableOpacity } from 'react-native';
import store from '../../store/store';
import { getUserData } from '../../utils';

interface ListProps {
  title: string;
  data: { title: string; data: CheckBoxData[] }[];
}

interface CheckBoxData {
  label: string;
  value: boolean;
  time?: string;
  disabled?: boolean;
}

const data: CheckBoxData[] = [
  { label: 'New Articles', value: false, disabled: false },
  { label: 'New Videos', value: false, disabled: false },
  { label: 'New Music', value: false, disabled: false },
  { label: 'New Podcasts', value: false, disabled: false },
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
        data: [{ label: 'Every Time I recieve new content', value: false }],
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

const SettingList = ({ data }: { data: ListProps[] }) => {
  const [_, setListData] = useState<ListProps[]>();
  const { colors } = useTheme();
  const [toggle, setToggle] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const setUserNotifications = () => {
    console.log('list1', List[0].data[0]);
    console.log('list2', List[0].data[1]);

    store.currentUserNotificationSetting.set({
      all: List[0].data[1].data[0].value,
      whenReceivedNewArticle: List[0].data[0].data[0].value,
      whenReceivedNewVideo: List[0].data[0].data[1].value,
      whenReceivedNewMusic: List[0].data[0].data[2].value,
      whenReceivedNewPodcast: List[0].data[0].data[3].value,
    });
  };

  const getNotificationSettings = async () => {
    const storedData = await getUserData();
    let tempData = [...data];
    const NotificationSetting = storedData?.NotificationSetting;

    console.log(
      'whenReceivedNewArticle',
      NotificationSetting?.whenReceivedNewArticle,
    );
    console.log(
      'whenReceivedNewVideo',
      NotificationSetting?.whenReceivedNewVideo,
    );
    console.log(
      'whenReceivedNewMusic',
      NotificationSetting?.whenReceivedNewMusic,
    );
    console.log(
      'whenReceivedNewPodcast',
      NotificationSetting?.whenReceivedNewPodcast,
    );

    if (NotificationSetting?.all) {
      tempData[0].data[1].data[0].value = true;
      tempData[0].data[0].data.forEach(item => {
        item.value = true;
        item.disabled = true;
      });
    }
    if (
      !NotificationSetting?.all &&
      NotificationSetting?.whenReceivedNewArticle == true
    ) {
      tempData[0].data[0].data[0].value = true;
      tempData[0].data[1].data[0].value = false;
    }
    if (
      !NotificationSetting?.all &&
      NotificationSetting?.whenReceivedNewVideo == true
    ) {
      tempData[0].data[0].data[1].value = true;
      tempData[0].data[1].data[0].value = false;
    }
    if (
      !NotificationSetting?.all &&
      NotificationSetting?.whenReceivedNewMusic == true
    ) {
      tempData[0].data[0].data[2].value = true;
      tempData[0].data[1].data[0].value = false;
    }
    if (
      !NotificationSetting?.all &&
      NotificationSetting?.whenReceivedNewPodcast == true
    ) {
      tempData[0].data[0].data[3].value = true;
      tempData[0].data[1].data[0].value = false;
    }

    setListData([...tempData]);
  };

  useEffect(() => {
    data[0].data[0].data.forEach(item => {
      item.value = false;
      item.disabled = false;
    });
    getNotificationSettings();
  }, []);

  const handleConfirm = (date: Date) => {
    const time = new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    let tempData = [...data];
    let tempItem = {
      ...data[0].data[1].data[1],
      value: data[0].data[1].data[1].value,
    };
    tempData[0].data[1].data[1] = { ...tempItem, time: time };
    setListData([...tempData]);
    hideDatePicker();
  };
  const reMap = (item: CheckBoxData, index: number, index2: number) => {
    console.log('item', item, index, index2, !item?.value);
    let tempData = [...data];

    if (index == 1 && index2 == 0 && !item.value == true) {
      let tempItem = { ...item, value: !item?.value };
      tempData[0].data[index].data[index2] = tempItem;
      List[0].data[0].data.map((i, ind) => {
        tempData[0].data[0].data[ind].value = tempItem.value;
        tempData[0].data[0].data[ind].disabled = tempItem.value;
      });
      setListData([...tempData]);
    } else if (index == 1 && index2 == 0 && !item.value == false) {
      let tempItem = { ...item, value: !item?.value };
      tempData[0].data[index].data[index2] = tempItem;
      List[0].data[0].data.map((i, ind) => {
        tempData[0].data[0].data[ind].disabled = tempItem.value;
      });
      setListData([...tempData]);
    } else {
      let tempItem = { ...item, value: !item?.value };
      tempData[0].data[index].data[index2] = tempItem;
      setListData([...tempData]);
    }
    setUserNotifications();
  };

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => index + item.title}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <MyText textStyle={styles.nestedTitle}>{item.title}</MyText>
          <FlatList
            data={item.data}
            nestedScrollEnabled={true}
            renderItem={({ item, index: index2 }) => (
              <>
                <View
                  style={{
                    ...styles.nestedItem,
                    alignItems: toggle ? 'flex-start' : 'center',
                    opacity: item.disabled ? 0.5 : 1,
                  }}>
                  <CheckBox
                    disabled={item.disabled}
                    center
                    checked={item?.value}
                    checkedColor={colors.primary}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    onPress={() => reMap(item, index, index2)}
                  />

                  <MyText
                    textStyle={{ bottom: 1, marginTop: toggle ? 17.8 : 0 }}>
                    {item.label}
                  </MyText>
                  {/* {index2 == 1 && index == 1 && (
                    <>
                      <Dropdown
                        type="from"
                        containerStyle={{ marginHorizontal: 10 }}
                        toggleValue={toggle}
                        handleToggle={() => setToggle(!toggle)}
                        defaultLabel="From"
                        dataSource={[
                          { id: '1', name: '12:00' },
                          { id: '2', name: '1:00' },
                        ]}
                      />
                      <MyText
                        children="PM time"
                        textStyle={{ bottom: 1, marginTop: toggle ? 17.8 : 0 }}
                      />
                    </>
                  )} */}
                  {index2 == 1 && index == 1 && (
                    <TouchableOpacity
                      onPress={showDatePicker}
                      activeOpacity={0.8}
                      style={{
                        ...styles.timePicker,
                        borderColor: colors.text,
                      }}>
                      <MyText children={item.time ?? ''} />
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
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
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 22,
  },
  nestedTitle: {
    paddingHorizontal: 10,

    fontSize: 16,
  },
  timePicker: {
    borderWidth: 1,
    minHeight: 30,
    minWidth: 50,
    alignSelf: 'center',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
