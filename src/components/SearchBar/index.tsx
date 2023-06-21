import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from '@rneui/themed';

import { colors } from '../../theme';

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
      <Icon type="feather" name="search" color={'#8c9298'} size={20} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#8c9298'}
        returnKeyType="search"
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: colors.card,
  },
  input: { marginLeft: 8, color: colors.text, width: '97%' },
});
