import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import {
  CommunityCard,
  Dropdown,
  LabelBox,
  MyCanvas,
  MyText,
  NormalBtn,
} from '../../components';
import { Icon } from '@rneui/themed';

const groupData = [
  {
    name: 'Group 1',
    details: '5 Members',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'Group 2',
    details: '3 Members',
    image: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
];

const friendData = [
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'John',
    details: '7 Friends',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

export default function Share() {
  const { colors } = useTheme();
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [ddSelection, setDdselection] = useState('f');

  return (
    <MyCanvas>
      <View>
        <MyText textStyle={{ fontSize: 18 }}>Send To: </MyText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          flexWrap: 'wrap',
        }}>
        <LabelBox label="John Doe" />
        <LabelBox label="Group 1" />
        <LabelBox label="Friend 2" />
        <LabelBox label="Lorem Ipsum et Cetera" />
        <LabelBox label="Abc123" />
        <LabelBox label="Huzaifa Ali" />
      </View>
      <View style={{ marginVertical: 5 }}>
        <MyText textStyle={{ fontSize: 18 }}>Message: </MyText>
      </View>
      <View
        style={{
          padding: 5,
        }}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter a Message Body with the share content..."
          placeholderTextColor={'#ffffff55'}
          style={{
            color: colors.text,
            fontFamily: Platform.OS == 'ios' ? 'Verdana' : 'sans-serif-medium',
            textAlignVertical: 'top',
            borderWidth: 2,
            borderColor: 'grey',
            borderRadius: 5,
            padding: 10,
            minHeight: 100,
          }}
          multiline
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          padding: 5,
          zIndex: 99,
          overflow: 'visible',
        }}>
        <MyText textStyle={{ fontSize: 18 }}>Select: </MyText>
        <Dropdown
          defaultLabel="Friends"
          dataSource={[
            { name: 'Friends', id: 'f' },
            { name: 'Groups', id: 'g' },
          ]}
          toggleValue={dropDownToggle}
          type="sendType"
          handleLabel={val => setDdselection(val?.id!)}
          handleToggle={() => setDropDownToggle(!dropDownToggle)}
        />
      </View>
      <FlatList
        data={ddSelection == 'f' ? friendData : groupData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          ddSelection == 'f' ? (
            <CommunityCard
              name={item.name}
              details={item.details}
              image={item.image}
              checkbox
            />
          ) : (
            <CommunityCard
              name={item.name}
              details={item.details}
              image={item.image}
              group
            />
          )
        }
      />
      <NormalBtn
        title="Share"
        titleStyle={{ fontSize: 18 }}
        btnStyle={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
          width: '100%',
        }}
        icon={<Icon name="share" type="font-awesome" color={colors.text} />}
      />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
