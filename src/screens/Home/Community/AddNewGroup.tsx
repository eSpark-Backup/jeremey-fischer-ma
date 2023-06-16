import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

import {HomeNavProps} from '../../../types';
import {colors} from '../../../theme';
import {
  CommunityCard,
  GapView,
  MyCanvas,
  MyText,
  NormalBtn,
  SearchBar,
} from '../../../components';

export default function AddNewGroup() {
  const navigation = useNavigation<HomeNavProps['navigation']>();
  return (
    <MyCanvas>
      <View style={{alignSelf: 'center', width: '95%'}}>
        <MyText children="Enter Group Name" />
        <GapView />
        <TextInput
          style={{
            color: colors.background,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          placeholder={'Type Group Name'}
          placeholderTextColor="#676767"
          underlineColorAndroid="transparent"
        />
      </View>
      <GapView length={30} />
      <View style={{alignSelf: 'center', width: '100%'}}>
        <MyText children="Add Friends to Group" textStyle={{marginLeft: 20}} />
        <GapView />
        <SearchBar placeholder="Seach by email" />
      </View>
      <ScrollView style={{flex: 1}}>
        <CommunityCard
          name="John"
          details="john@email.com"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          checkbox
        />
        <CommunityCard
          name="John"
          details="john@email.com"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          checkbox
        />
        <CommunityCard
          name="John"
          details="john@email.com"
          image="https://randomuser.me/api/portraits/men/22.jpg"
          checkbox
        />
      </ScrollView>
      <GapView length={20} />
      <NormalBtn
        title="Add Group"
        btnStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '95%',
        }}
        onPress={() => navigation.navigate('GroupsList')}
        icon={<Icon name="user-plus" type="font-awesome-5" color={'#ffffff'} />}
      />
      <GapView length={5} />
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
