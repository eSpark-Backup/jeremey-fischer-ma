import firestore from '@react-native-firebase/firestore';
import {db} from '.';
import {FriendRequest, User} from '../types';
import {collections} from './constants';

export const getAllRequest = async (uid: string) => {
  try {
    const requests: FriendRequest[] = [];
    const result = await db()
      .collection(collections.friendRequests)
      .where('receiverId', '==', uid)
      .get();

    if (result.empty) {
      return {data: null, message: 'You have not any pending request!'};
    } else {
      result.forEach(res => {
        const responseData: any = res.data();
        responseData.id = res.id;
        requests.push(responseData);
      });
      return {data: requests, message: 'All Requests'};
    }
  } catch (error) {
    console.log('getAllRequest', error);
    return {data: null, message: 'Something went wrong!'};
  }
};

export const sendRequest = async (data: FriendRequest) => {
  try {
    const res: any = await db()
      .collection(collections.friendRequests)
      .add({...data, status: 'pending'});
    const requestData: FriendRequest = (await res.get()).data();
    requestData.id = (await res.get()).id;
    return {data: requestData, message: 'Request Send Successfully'};
  } catch (error) {
    console.log('sendRequest', error);
    return {data: null, message: 'Something went wrong!'};
  }
};

export const acceptRequest = async (id: string) => {
  try {
    const isRequestExist = await db()
      .collection(collections.friendRequests)
      .doc(id)
      .get();
    if (isRequestExist.exists) {
      const result = await db()
        .collection(collections.friendRequests)
        .doc(id)
        .update({status: 'accept'});
      var senderRef;
      var receiverRef;

      (
        await db()
          .collection(collections.users)
          .where('uid', '==', isRequestExist.data()?.senderId)
          .get()
      ).forEach(res => (senderRef = res.id));

      (
        await db()
          .collection(collections.users)
          .where('uid', '==', isRequestExist.data()?.receiverId)
          .get()
      ).forEach(res => (receiverRef = res.id));

      await db()
        .collection(collections.users)
        .doc(senderRef)
        .update({
          Friends: firestore.FieldValue.arrayUnion(
            isRequestExist.data()?.receiverId,
          ),
        });

      await db()
        .collection(collections.users)
        .doc(receiverRef)
        .update({
          Friends: firestore.FieldValue.arrayUnion(
            isRequestExist.data()?.senderId,
          ),
        });

      return {data: null, message: 'Request accepted'};
    } else {
      return {data: null, message: 'Request not found'};
    }
  } catch (error) {
    console.log('acceptRequest error', error);
    return {data: null, message: 'Something went wrong!'};
  }
};

export const rejectRequest = async (id: string) => {
  try {
    const isRequestExist = await db()
      .collection(collections.friendRequests)
      .doc(id)
      .get();
    if (isRequestExist.exists) {
      const result = await db()
        .collection(collections.friendRequests)
        .doc(id)
        .update({status: 'reject'});
      return {data: null, message: 'Request rejected'};
    } else {
      return {data: null, message: 'Request not found'};
    }
  } catch (error) {
    console.log('rejectRequest error', error);
    return {data: null, message: 'Something went wrong!'};
  }
};
