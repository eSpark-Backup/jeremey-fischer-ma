import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { Icon } from '@rneui/themed';

import { colors } from '../../theme';

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
  clearInput,
}: {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  clearInput?: () => void;
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
        onSubmitEditing={onSubmitEditing}
        keyboardType="email-address"
      />
      {value && (
        <TouchableOpacity onPress={clearInput}>
          <Icon type="feather" name="x" color={'#8c9298'} size={20} />
        </TouchableOpacity>
      )}
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
  input: {
    marginLeft: 8,
    color: colors.text,
    width: '88%',
    fontFamily: 'DMSans-Regular',
  },
});
