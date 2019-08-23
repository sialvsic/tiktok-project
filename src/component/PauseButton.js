import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const PauseButton = ({onPress}) => {
  return (
    <Icon.Button
      name="ios-pause"
      onPress={onPress}
      size={40}
      backgroundColor="transparent"
      iconStyle={{textAlign: 'center'}}
    />
  );
};

export default PauseButton;
