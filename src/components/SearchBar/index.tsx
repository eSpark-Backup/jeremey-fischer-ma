import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from '@rneui/themed';

import {colors} from '../../theme';

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
}: {
  value?: string;
  placeholder?: string;
  onChangeText?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Icon type="feather" name="search" color={'grey'} size={20} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#676767"
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  input: {marginLeft: 8, color: colors.background, width: '97%'},
});
