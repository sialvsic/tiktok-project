import React from 'react';
import {View} from 'react-native';

class MeScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
    );
  }
}

export default MeScreen;
