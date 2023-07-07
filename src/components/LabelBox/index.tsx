import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyText from '../MyText';
import { Icon } from '@rneui/themed';
import GapView from '../GapView';

export default function LabelBox({
  label,
  onCross = () => {},
}: {
  label: string;
  onCross: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 2,
        paddingHorizontal: 5,
        margin: 5,
        backgroundColor: colors.card,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <MyText textStyle={{ fontSize: 14 }}>{label}</MyText>
      <GapView mode="horizontal" length={5} />
      <Icon
        onPress={onCross}
        name="close"
        type="ionicon"
        color={colors.text}
        size={14}
        style={{ textAlignVertical: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
