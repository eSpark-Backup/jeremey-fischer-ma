import firestore from '@react-native-firebase/firestore';
import { db } from '.';
import { FriendRequest, User } from '../types';
import { collections } from './constants';
import {
  getFcmsOfRequiredUser,
  sendNotification,
} from './notification.controller';

/**
 * Fetch User FriendRequest
 * @param {uid}  uid - `uid` is uid of a user which friend request needs to be fetched
 * @returns {FriendRequest[]} `FriendRequest[]` Return FriendRequests
 */
export const getAllRequest = async (uid: string) => {
  try {
    const requests: FriendRequest[] = [];
    const promises: Promise<any>[] = [];
    const result = await db()
      .collection(collections.friendRequests)
      .where('receiverId', '==', uid)
      .where('status', '==', 'pending')
      .get();

    if (result.empty) {
      return { data: null, message: 'You have not any pending request!' };
    } else {
      result.forEach(async res => {
        const responseData: any = res.data();
        let sender: User | undefined = undefined;
        const fetchSender = db()
          .collection(collections.users)
          .where('uid', '==', responseData.senderId)
          .get()
          .then(senderSnap => {
            if (!senderSnap.empty) {
              senderSnap.forEach(
                (senderData: any) => (sender = senderData.data()),
              );
            }
          });
        promises.push(fetchSender);
        await Promise.all([fetchSender]);
        responseData.id = res.id;
        responseData.sender = sender;
        requests.push(responseData);
      });
      await Promise.all(promises);
      return { data: requests, message: 'All Requests' };
    }
  } catch (error) {
    console.log('getAllRequest', error);
    return { data: null, message: 'Something went wrong!' };
  }
};

/**
 * Send FriendRequest
 * @param {FriendRequest}  FriendRequest - `FriendRequest` send Required data to send request
 * @returns {string} `message` Return message wheter it success or failed
 */
export const sendRequest = async (data: FriendRequest, senderName: string) => {
  try {
    const res: any = await db()
      .collection(collections.friendRequests)
      .add({ ...data, status: 'pending' });
    const requestData: FriendRequest = (await res.get()).data();
    requestData.id = (await res.get()).id;
    const fcmsTokens = await getFcmsOfRequiredUser(
      [requestData.receiverId],
      'FriendRequest',
    );
    sendNotification(fcmsTokens, `${senderName} sent a request`, '');
    return { data: requestData, message: 'Request Send Successfully' };
  } catch (error) {
    console.log('sendRequest', error);
    return { data: null, message: 'Something went wrong!' };
  }
};

/**
 * Accept FriendRequest
 * @param {id}  id - `id` id of friend request
 * @returns {string} `message` Return message wheter it success or failed
 */
export const acceptRequest = async (id: string, userName: string) => {
  try {
    const isRequestExist = await db()
      .collection(collections.friendRequests)
      .doc(id)
      .get();
    if (isRequestExist.exists) {
      const result = await db()
        .collection(collections.friendRequests)
        .doc(id)
        .update({ status: 'accept' });
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

      const fcmsTokens = await getFcmsOfRequiredUser(
        [isRequestExist.data()?.senderId],
        'FriendRequest',
      );
      sendNotification(
        fcmsTokens,
        `${userName} accept your friend request`,
        '',
      );
      return { data: null, message: 'Request accepted' };
    } else {
      return { data: null, message: 'Request not found' };
    }
  } catch (error) {
    console.log('acceptRequest error', error);
    return { data: null, message: 'Something went wrong!' };
  }
};

/**
 * Reject FriendRequest
 * @param {id}  id - `id` id of friend request
 * @returns {string} `message` Return message wheter it success or failed
 */
export const rejectRequest = async (id: string, userName: string) => {
  try {
    const isRequestExist = await db()
      .collection(collections.friendRequests)
      .doc(id)
      .get();
    if (isRequestExist.exists) {
      const result = await db()
        .collection(collections.friendRequests)
        .doc(id)
        .update({ status: 'reject' });
      const fcmsTokens = await getFcmsOfRequiredUser(
        [isRequestExist.data()?.senderId],
        'FriendRequest',
      );
      sendNotification(
        fcmsTokens,
        `${userName} reject your friend request`,
        '',
      );
      return { data: null, message: 'Request rejected' };
    } else {
      return { data: null, message: 'Request not found' };
    }
  } catch (error) {
    console.log('rejectRequest error', error);
    return { data: null, message: 'Something went wrong!' };
  }
};
