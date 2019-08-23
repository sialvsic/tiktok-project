import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayButton = ({onPress}) => {
  return (
    <Icon.Button
      name="ios-play"
      size={40}
      onPress={onPress}
      backgroundColor="transparent"
    />
  );
};

export default PlayButton;
