import {BackHandler} from 'react-native';

export const disableBackButton =  () => {
    const backHandler = BackHandler.addEventListener(
     'hardwareBackPress',
     () => true,
   );
   return () => backHandler.remove();
 };