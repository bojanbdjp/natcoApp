import React from 'react';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
import registerForPushNotificationsAsync from './NotificationFunction';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
     registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(this._handleNotification);
    
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    };

  _handleNotificationResponse = response => {
    console.log(response);
    };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your expo push token: {this.state.expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {this.state.notification.request.content.title}</Text>
          <Text>Body: {this.state.notification.request.content.body}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.request.content.data)}</Text>
        </View>
      </View>
    );
  }
}