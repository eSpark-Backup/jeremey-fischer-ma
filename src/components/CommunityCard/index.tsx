import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Avatar, CheckBox, Icon } from '@rneui/themed';

import { colors } from '../../theme';
import MyText from '../MyText';
import { OutlineBtn } from '../Button';

export default function CommunityCard({
  name,
  details,
  image,
  requestBtn,
  addBtn,
  checkbox,
  group,
  onPress,
  onPressAddBtn,
  onRequestCancel,
  onRequestAccept,
}: {
  name: string;
  details: string;
  image: string;
  requestBtn?: boolean;
  addBtn?: boolean;
  checkbox?: boolean;
  group?: boolean;
  onPress?: () => void;
  onPressAddBtn?: () => void;
  onRequestCancel?: () => void;
  onRequestAccept?: () => void;
}) {
  const [check, setcheck] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Avatar rounded size={'medium'} source={{ uri: image }} />
        <View style={styles.contentContainer}>
          <MyText children={name} textStyle={{ fontSize: 16 }} />
          <MyText children={details} />
        </View>
      </View>
      {requestBtn && (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onRequestCancel}
            activeOpacity={0.8}
            style={{ ...styles.requestBtns }}>
            <Icon name="close" color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRequestAccept}
            activeOpacity={0.8}
            style={{ ...styles.requestBtns }}>
            <Icon name="check" color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
      {addBtn && (
        <OutlineBtn
          onPress={onPressAddBtn}
          title="Add"
          btnStyle={styles.addBtn}
        />
      )}
      {checkbox && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <CheckBox
            checked={check}
            size={30}
            onPress={() => setcheck(!check)}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            checkedColor={colors.primary}
            uncheckedColor={colors.primary}
            containerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
            }}
          />
          <MyText children="Add" />
        </View>
      )}
      {group && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/men/22.jpg' }}
          />
          <Avatar
            rounded
            containerStyle={{
              right: 5,
            }}
            source={{ uri: 'https://randomuser.me/api/portraits/men/21.jpg' }}
          />
          <Avatar
            rounded
            containerStyle={{
              right: 10,
            }}
            source={{ uri: 'https://randomuser.me/api/portraits/men/29.jpg' }}
          />
          <MyText textStyle={{ right: 10 }} children="+ 2" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.card,
  },
  row: { flexDirection: 'row' },
  contentContainer: { marginLeft: 10, justifyContent: 'center' },
  requestBtns: { marginRight: 10, padding: 5 },
  addBtn: {
    marginRight: 10,
  },
});
