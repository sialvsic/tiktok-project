import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabNavigator from './src/component/tabNavigation';

const App = () => {
  return (
    <View style={styles.safeArea}>
      <TabNavigator style={styles.navigator} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navigator: {
    position: 'absolute',
    bottom: 0,
  },
});

export default App;
