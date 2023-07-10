import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  UIManager,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import {
  CommunityCard,
  Dropdown,
  EmptyFeedLabel,
  FeedCard,
  GapView,
  MyCanvas,
  MyText,
  NormalBtn,
  SearchBar,
} from '../../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';
import modalState from '../../../store/modalStates';
import store from '../../../store/store';
import { NewsFeed, User } from '../../../types';
import { getFriends } from '../../../utils';
import {
  extractFeedsByUser,
  toggleViewed,
} from '../../../utils/globalFunctions';
import loaders from '../../../store/loaders';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Search() {
  const { colors } = useTheme();
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<NewsFeed[]>([]);
  const [search, setSearch] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<{
    id?: string;
    name?: string;
  }>({});
  const friendStore: any = useHookstate(store.friends);
  const newsFeed = useHookstate(store?.newsFeed).get();
  const friends: User[] = friendStore.get();
  const { loadFriends } = useHookstate(store);
  const loader = useHookstate(loaders.newsFeed).get();
  const searchModal = useHookstate(modalState?.search);
  const [modalVisible, setModalVisible] = useState<boolean>(
    searchModal?.get()!,
  );
  const transAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const showMenu = () => {
    // Will change transAnim value to 0 in 2 seconds
    getFriends();
    setModalVisible(true);
    Animated.timing(transAnim, {
      toValue: 10,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    // Will change transAnim value to 100 in 2 seconds
    setModalVisible(false);
    Animated.timing(transAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const selectFriend = (uid: string, userName: string) => {
    setSearch('');
    setData(extractFeedsByUser(newsFeed, uid, toggle));
    setSelectedFriend({ id: uid, name: userName });
    hideMenu();
  };

  const searchContent = (e: string) => {
    setSearch(e);
    if (e) {
      const chars = e.toLowerCase();
      const arrr = newsFeed?.filter(item =>
        item.content.title.toLowerCase().includes(chars),
      );
      setData(extractFeedsByUser(arrr, selectedFriend.id!, toggle));
    } else {
      setData(extractFeedsByUser(newsFeed, selectedFriend.id!, toggle));
    }
  };

  function renderFeed({ item, index }: { item: NewsFeed; index: number }) {
    return (
      <FeedCard
        key={index}
        contentData={item.content}
        senderData={item.sender}
      />
    );
  }

  return (
    <MyCanvas>
      {selectedFriend.id != undefined ? (
        <SearchBar
          value={search}
          placeholder="Seach content"
          onChangeText={searchContent}
        />
      ) : null}

      <View style={styles.btnContainer}>
        <Dropdown
          type="fri"
          toggleValue={false}
          handleToggle={() => showMenu()}
          defaultLabel={selectedFriend?.name ?? 'Select Friend'}
          dataSource={[]}
        />
        <GapView mode="horizontal" />
        <NormalBtn
          title={toggle ? 'Unread' : 'Read'}
          btnStyle={{ width: '30%' }}
          onPress={() => {
            setToggle(!toggle);
            setData(toggleViewed(newsFeed, selectedFriend?.id ?? '', toggle));
          }}
        />
      </View>
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderFeed}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Content Found" />}
        />
      )}
      {modalVisible && (
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            position: 'absolute',
          }}>
          <TouchableOpacity onPress={() => hideMenu()}>
            <View
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      <Animated.View
        style={{
          bottom: 0,
          position: 'absolute',
          justifyContent: 'center',
          transform: [{ translateY: transAnim }],
          backgroundColor: colors.background,
        }}>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 10,
            flex: 1,
            height: SCREEN_HEIGHT / 1.5,
            width: SCREEN_WIDTH,
          }}>
          {loadFriends.get() ? (
            <ActivityIndicator
              size={'large'}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            <>
              <FlatList
                data={friends}
                renderItem={({ item }) => (
                  <CommunityCard
                    name={item.userName}
                    details={item.email}
                    image={item.image}
                    addBtn={
                      item.isFriend == false || !item.isFriend == undefined
                    }
                    requested={item.isRequested}
                    onPress={() => selectFriend(item?.uid!, item?.userName)}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      width: '100%',
                      height: 1,
                    }}
                  />
                )}
                ListEmptyComponent={
                  <MyText
                    textStyle={{ textAlign: 'center', marginTop: 10 }}
                    children="No Friends to Show"
                  />
                }
              />
            </>
          )}
        </View>
      </Animated.View>
    </MyCanvas>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
