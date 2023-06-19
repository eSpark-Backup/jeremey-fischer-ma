import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import MI from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import useUpdateEffect from '../../utils/hooks/useUpdateEffect';

const Dropdown = ({
  dataSource,
  handleLabel,
  type,
  toggleValue,
  handleToggle,
  title,
  defaultLabel,
  minWidth,
}: {
  dataSource: { name: string; id: string }[];
  handleLabel?: (value: { name?: string; id?: string }, type: string) => void;
  type: string;
  toggleValue: boolean;
  handleToggle?: (type: string) => void;
  title?: string;
  defaultLabel: string;
  minWidth?: number;
}) => {
  const [label, setLabel] = useState<{ name?: string; id?: string }>({
    name: '',
    id: '',
  });
  const { colors }: Theme = useTheme();
  const borderColor = colors.primary;

  useUpdateEffect(() => {
    handleLabel?.(label, type); //? to Send the Selected Label to parent
  }, [label]);

  const renderList = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        style={{ backgroundColor: colors.primary }}
        onPress={() => {
          setLabel(item); //? to Change the Label of the Dropdown
          handleToggle?.(type); //? to Toggle the Dropdown
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            ...styles.itemContainer,
          }}>
          <Text style={{ color: colors.text, ...styles.itemText }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        minWidth: minWidth,
      }}>
      {title && (
        <Text
          style={{
            color: colors.text,
            ...styles.labelText,
          }}>
          {title}
        </Text>
      )}
      <TouchableOpacity onPress={() => handleToggle?.(type)}>
        <View
          style={{
            borderColor: borderColor,
            ...styles.dropdownLabelContainer,
          }}>
          <View style={styles.dropdownLabelInner}>
            <Text style={{ color: colors.text, ...styles.dropDownText }}>
              {label.name == '' ? defaultLabel : label.name}
            </Text>
            {toggleValue ? (
              <MI name="arrow-drop-up" color={colors.text} size={22} />
            ) : (
              <MI name="arrow-drop-down" color={colors.text} size={22} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {toggleValue && (
        <View
          style={{
            ...styles.dropDownContainer,
            borderColor: borderColor,
            maxHeight: 100,
            minWidth: minWidth,
          }}>
          <ScrollView>
            <FlatList
              data={dataSource}
              nestedScrollEnabled
              renderItem={renderList}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
