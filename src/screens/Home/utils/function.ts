import { searchUser } from '../../../api/user.controller';
import store from '../../../store/store';

export const getSearchedFriend = async (searchVal: string) => {
  store.loadFriends.set(true);
  searchUser(searchVal, store.userData.get()?.uid).then(res => {
    console.log('get searched friend', JSON.stringify(res));
    store.friends.set(res.data);
    store.loadFriends.set(false);
  });
};
