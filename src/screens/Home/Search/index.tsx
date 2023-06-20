import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Dropdown,
  GapView,
  MyCanvas,
  MyText,
  NormalBtn,
  SearchBar,
} from '../../../components';

export default function Search() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <MyCanvas>
      <SearchBar placeholder="Seach content" />
      <View style={styles.btnContainer}>
        <Dropdown
          type="from"
          toggleValue={toggle}
          handleToggle={() => setToggle(!toggle)}
          defaultLabel="From"
          dataSource={[
            { id: '1', name: 'Option 1' },
            { id: '2', name: 'Option 2' },
          ]}
        />
        <GapView mode="horizontal" />
        <NormalBtn title="Unread" btnStyle={{ width: '30%' }} />
      </View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
