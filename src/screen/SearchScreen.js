import React from 'react';
import {View} from 'react-native';

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
    );
  }
}

export default SearchScreen;
