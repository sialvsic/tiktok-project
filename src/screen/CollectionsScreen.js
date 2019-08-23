import React from 'react';
import {View} from 'react-native';

class CollectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Collections',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
    );
  }
}

export default CollectionsScreen;
