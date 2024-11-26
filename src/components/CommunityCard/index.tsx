import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, CheckBox, Icon } from '@rneui/themed';

import { colors } from '../../theme';
import MyText from '../MyText';
import { OutlineBtn } from '../Button';
import { Content, User } from '../../types';
import GapView from '../GapView';
import store from '../../store/store';

export default function CommunityCard({
  name,
  details,
  image,
  requestBtn,
  addBtn,
  checkbox,
  group,
  members,
  onPress,
  onPressAddBtn,
  onRequestCancel,
  onRequestAccept,
  onChecked,
  checked = false,
  requested,
  contents = [],
}: {
  name: string;
  details: string;
  image: string;
  requestBtn?: boolean;
  addBtn?: boolean;
  checkbox?: boolean;
  group?: boolean;
  members?: User[] | string[];
  checked?: boolean;
  onPress?: () => void;
  onPressAddBtn?: () => void;
  onRequestCancel?: () => void;
  onRequestAccept?: () => void;
  onChecked?: (isChecked: boolean) => void;
  requested?: boolean;
  contents?: Content[];
}) {
  const unreadContents = contents.filter(
    val => !val.isViewed && val.senderId != store.userData.get()?.uid,
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {Boolean(unreadContents?.length) && (
        <View
          style={{
            height: 18,
            width: 18,
            backgroundColor: colors.primary,
            borderRadius: 100,
            position: 'absolute',
            right: -5,
            top: -4,
            // zIndex: 1,X
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MyText
            children={unreadContents?.length?.toString()}
            textStyle={{ fontSize: 12, fontWeight: 'bold' }}
          />
        </View>
      )}
      <View style={{ ...styles.row, flex: 1, alignItems: 'center' }}>
        <Avatar
          rounded
          size={'medium'}
          containerStyle={{ backgroundColor: colors.primary }}
          source={{
            uri: image ? image : undefined,
          }}
          title={image ? undefined : name?.charAt(0)?.toUpperCase()}
        />
        <View style={styles.contentContainer}>
          <MyText lines={1} children={name} textStyle={{ fontSize: 16 }} />
          <MyText children={details} />
        </View>
      </View>
      {requested && (
        <MyText
          children="Request Sent"
          textStyle={{ marginRight: 10, fontSize: 12 }}
        />
      )}
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
      {addBtn && !requested && (
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
            checked={checked}
            size={30}
            onPress={() => {
              const newVal = !checked;
              onChecked?.(newVal);
            }}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            checkedColor={colors.text}
            uncheckedColor={colors.text}
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
          {members?.map(
            (item, index) =>
              index < 3 &&
              typeof item !== 'string' && (
                <Avatar
                  rounded
                  containerStyle={{
                    left: 10 - 5 * index,
                  }}
                  source={{ uri: item?.image! }}
                />
              ),
          )}
          {members?.length! > 3 ? (
            <MyText children={`+${(members?.length! - 3).toString()}`} />
          ) : (
            <GapView mode="horizontal" />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    // flex: 1,
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
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  requestBtns: { marginRight: 5, padding: 5 },
  addBtn: {
    marginRight: 10,
  },
});
