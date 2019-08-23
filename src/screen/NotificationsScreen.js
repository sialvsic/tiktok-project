import React from 'react';
import {View} from 'react-native';

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
    );
  }
}

export default NotificationsScreen;
