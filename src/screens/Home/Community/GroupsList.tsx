import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import { CommunityCard, GapView, MyText, NormalBtn } from '../../../components';
import { CommunityNavProps, Group } from '../../../types';
import { useHookstate } from '@hookstate/core';
import store from '../../../store/store';
import { colors } from '../../../theme';
import { getGroupContent } from '../../../utils';

export default function GroupsList() {
  const navigation = useNavigation<CommunityNavProps['navigation']>();
  const userGroupsStore: any = useHookstate(store.userGroups);
  const userGroups: Group[] = userGroupsStore.get();
  const { loadGroups } = useHookstate(store);

  return (
    <View style={{ flex: 1 }}>
      {loadGroups.get() ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <FlatList
          data={userGroups}
          renderItem={({ item }) => (
            <CommunityCard
              key={item.id}
              group
              name={item.groupName}
              details={`${item.Members.length} Members`}
              members={item?.Members!}
              image={item.groupCreator?.image!}
              onPress={() => {
                navigation.navigate('GroupDetails', { groupId: item.id });
              }}
              contents={item.contents}
            />
          )}
          ListEmptyComponent={
            <MyText
              textStyle={{ textAlign: 'center', marginTop: 10 }}
              children="No Groups to Show"
            />
          }
        />
      )}
      <GapView />
      <NormalBtn
        title="Add Group"
        btnStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '95%',
        }}
        onPress={() => navigation.navigate('AddNewGroup')}
        icon={<Icon name="user-plus" type="font-awesome-5" color={'#ffffff'} />}
      />
      <GapView length={5} />
    </View>
  );
}

const styles = StyleSheet.create({});
