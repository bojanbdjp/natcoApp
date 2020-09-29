
import Constants from 'expo-constants';
//import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import AsyncStorage from '@react-native-community/async-storage'

import {URL} from '../api/server'

const saveToken = async (token) => {
  const email = await AsyncStorage.getItem('email');
  
  fetch(`${URL}/pushToken`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      email: email
    }),
  }).then((res) => {
    //console.log("Ovo je response: ", JSON.stringify(res));
  }).catch((err)=> {
    console.log("Ovo je error: ", JSON.stringify(err));
  });
}


export default registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    saveToken(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
  };