import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useHookstate } from '@hookstate/core';
import { useTheme } from '@react-navigation/native';

import {
  ArchiveCard,
  EmptyFeedLabel,
  GapView,
  MyCanvas,
} from '../../components';
import loaders from '../../store/loaders';
import { Archive } from '../../types';
import { getAllArchive } from '../../api/archive.controller';
import store from '../../store/store';

export default function App() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const loader = useHookstate(loaders?.archive);
  const userData = useHookstate(store?.userData);
  const archiveData = useHookstate(store?.archives);

  const { colors } = useTheme();

  useEffect(() => {
    getAllArchives();
  }, []);

  async function getAllArchives() {
    try {
      loader.set(true);
      const res = await getAllArchive(userData?.get()?.['uid'] ?? '');
      if (res?.data != null) {
        archiveData.set(res?.data);
        setArchives(res?.data);
        loader.set(false);
      } else {
        console.log('message', res.message);
        loader.set(false);
      }
    } catch (e) {
      console.log('err at newsfeed fetch', e);
      loader.set(false);
    }
  }

  function renderArchive({ item, index }: { item: Archive; index: number }) {
    return (
      <ArchiveCard
        key={index}
        contentData={item?.content!}
        senderData={item?.user!}
      />
    );
  }

  return (
    <MyCanvas>
      {loader.get() ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <FlatList
          data={archives}
          renderItem={renderArchive}
          ItemSeparatorComponent={() => <GapView />}
          ListEmptyComponent={<EmptyFeedLabel label="No Archives Found" />}
        />
      )}
    </MyCanvas>
  );
}
