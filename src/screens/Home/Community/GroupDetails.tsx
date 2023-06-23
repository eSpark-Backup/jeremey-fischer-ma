import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { FeedCard, GapView, MyCanvas } from '../../../components';
import { CommunityNavProps } from '../../../types';
import CommunityNav from '../../../navigation/CommunityNav';

export default function GroupDetails() {
  const route = useRoute<CommunityNavProps['route']>();

  console.log('route', route.params.content);

  return (
    <MyCanvas>
      <FlatList
        data={route.params.content}
        renderItem={({ item }) => (
          <>
            <FeedCard
              date="today"
              title={item.title}
              description={item.description}
              favIcon={item.favIcon}
              senderName={item.sender?.userName}
              senderImage={item.sender?.image}
              image={item.image}
              time={'3h'}
            />
            <GapView />
          </>
        )}
      />
      {/* <ScrollView>
        <FeedCard
          date="today"
          image={'https://randomuser.me/api/portraits/men/22.jpg'}
          time={'3h'}
        />
        <GapView />
        <FeedCard
          date="yesterday"
          image={'https://randomuser.me/api/portraits/men/21.jpg'}
          time={'2h'}
        />
        <GapView />
        <FeedCard
          image={'https://randomuser.me/api/portraits/men/20.jpg'}
          time={'2h'}
        />
      </ScrollView> */}
    </MyCanvas>
  );
}

const styles = StyleSheet.create({});
