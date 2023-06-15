import {db} from '.';
import {collections} from './constants';
import firestore from '@react-native-firebase/firestore';

export const shareContentToGroup = async (groupId: string) => {
  try {
    const response = await db().collection(collections.contents).add({
      contentId: '',
      mediaType: 'Audio',
      createdAt: new Date(),
      title: 'title',
      image: 'image',
      description: 'description',
      channel: 'channel',
      duration: '09:30',
      artist: '',
      album: '',
      author: '',
    });
    await db()
      .collection(collections.contents)
      .doc(response.id)
      .update({id: response.id});
    await db()
      .collection(collections.groups)
      .doc(groupId)
      .update({
        contents: firestore.FieldValue.arrayUnion(response.id),
      });
    return {data: null, message: 'Post Shared Successfully'};
  } catch (error) {
    console.log('error shareContentToGroup', error);
    return {data: null, message: 'Something went wrong'};
  }
};
