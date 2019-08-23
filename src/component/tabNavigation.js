import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import SearchScreen from '../screen/SearchScreen';
import CollectionsScreen from '../screen/CollectionsScreen';
import VideoScreen from '../screen/VideoScreen';
import NotificationsScreen from '../screen/NotificationsScreen';
import MeScreen from '../screen/MeScreen';

const TabIconMap = {
  Search: 'ios-search',
  Collections: 'ios-archive',
  Video: 'ios-play',
  Notifications: 'md-notifications',
  Me: 'ios-contact',
};

const TabNavigator = createBottomTabNavigator(
  {
    Search: SearchScreen,
    Collections: CollectionsScreen,
    Video: VideoScreen,
    Notifications: NotificationsScreen,
    Me: MeScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;

        return (
          <Icon name={TabIconMap[routeName]} size={25} color={tintColor} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
