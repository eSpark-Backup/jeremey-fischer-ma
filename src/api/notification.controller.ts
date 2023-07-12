import { db } from '.';
import { NotificationSetting, User } from '../types';
import { collections } from './constants';

/**
 * Filter and return fcmToken Which user is able to recieve notification
 * @param {recieverIds} - string
 * @param {postType} - string
 * @returns {tokens} - user fcmsTokens
 */
export const getFcmsOfRequiredUser = async (
  receiverIds: string[],
  postType: 'Audio' | 'Video' | 'Podcast' | 'Article' | 'FriendRequest',
) => {
  try {
    const users: User[] = [];
    const results = await db()
      .collection(collections.users)
      .where('uid', 'in', receiverIds)
      .get();
    results.forEach((val: any) => {
      const userData: User = val.data();
      const userNotificationSetting = userData.NotificationSetting;
      if (userNotificationSetting?.all) {
        users.push(userData);
      } else {
        switch (postType) {
          case 'Video':
            if (userNotificationSetting?.whenReceivedNewVideo) {
              users.push(userData);
            }
            break;
          case 'Article':
            if (userNotificationSetting?.whenReceivedNewArticle) {
              users.push(userData);
            }
            break;
          case 'Audio':
            if (userNotificationSetting?.whenReceivedNewMusic) {
              users.push(userData);
            }
            break;
          case 'Podcast':
            if (userNotificationSetting?.whenReceivedNewPodcast) {
              users.push(userData);
            }
            break;
          case 'FriendRequest':
            users.push(userData);
            break;
          default:
            break;
        }
      }
    });
    const fcmToken = users
      .filter(val => val.fcmToken != '')
      .map(val => val.fcmToken);
    return fcmToken;
  } catch (error) {
    console.log('error');
    return [];
  }
};

/**
 * Filter and return fcmToken Which user is able to recieve notification
 * @param {fcmTokens} fcmTokens - array of fcmTokens
 * @param {title} title - Title of Notification
 * @param {description} description - Description of Notification
 * @param {data} data - Additional Notification Data about Notification
 * @returns {null} - nothing return
 */
export const sendNotification = async (
  fcmTokens: string[],
  title: string,
  description: string,
  data = {},
) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'key=AAAAMdDHNHA:APA91bH1nql3R2jym1UNAKjkG6_R3ahC2FzwQ_mBqxnLw4YmripzhItSOicu9og34iMKCEpRFgbCk2LAPbcybd0DgPymudRpYfNUp4MtBNLkDt_HzlsUHzouVhouX4CSoZ7NNEySsm97',
  );
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    registration_ids: fcmTokens,
    notification: {
      body: description,
      title: title,
      data: data,
    },
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

/**
 * Update Notfication Setting
 * @param {uid} - user id which notification setting is need to be update
 * @param {NotificationSetting} - updated NotificationSetting
 * @return {User} - updated user Data
 */
export const UpdateUserNotificationSetting = async (
  uid: string,
  NotificationSetting: NotificationSetting,
) => {
  try {
    const response = await db()
      .collection(collections.users)
      .where('uid', '==', uid)
      .get();

    if (response.empty) {
      return { data: null, message: 'User Not Found!' };
    } else {
      let docId: string = '';
      let updatedUser: any | User = undefined;
      const promises: Promise<any>[] = [];
      response.forEach(async (user: any) => {
        updatedUser = user.data();
        docId = user.id;
        const updateSettingPromise = db()
          .collection(collections.users)
          .doc(user.id)
          .update({
            NotificationSetting: NotificationSetting,
          });
        promises.push(updateSettingPromise);
        await Promise.all([updateSettingPromise]);
      });
      await Promise.all(promises);
      updatedUser.NotificationSetting = NotificationSetting;
      return { data: updatedUser, message: 'Updated User' };
    }
  } catch (error) {
    return { data: null, message: error };
  }
};
