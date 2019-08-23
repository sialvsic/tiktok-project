import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Swiper from 'react-native-swiper';
import PauseButton from '../component/PauseButton';
import PlayButton from '../component/PlayButton';
import Icon from 'react-native-vector-icons/Ionicons';

class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      showOperation: true,
      up: false,
    };
    this.settimeout = null;
    this.doPause = this.doPause.bind(this);
    this.doPlay = this.doPlay.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
    this._onThumpsUp = this._onThumpsUp.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
  }

  doPlay() {
    clearTimeout(this.settimeout);
    this.setState({
      paused: false,
    });
    this.settimeout = setTimeout(() => {
      this.setState({
        showOperation: false,
      });
    }, 3000);
  }

  doPause() {
    clearTimeout(this.settimeout);
    this.setState({
      paused: true,
    });
    this.settimeout = setTimeout(() => {
      this.setState({
        showOperation: true,
      });
    }, 3000);
  }

  _onPressButton() {
    this.setState({
      showOperation: !this.state.showOperation,
    });
  }

  _onThumpsUp() {
    this.setState({
      up: !this.state.up,
    });
  }

  onVideoEnd() {
    this.setState({
      paused: true,
    });
  }

  render() {
    return (
      <View style={styles.backgroundVideo}>
        <TouchableOpacity style={styles.icon}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Details')}>
            <Icon
              name="md-contact"
              size={40}
              color={'gray'}
              backgroundColor="transparent"
              iconStyle={{textAlign: 'center'}}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onThumpsUp()}>
            <Icon
              name={this.state.up ? 'ios-heart' : 'ios-heart-empty'}
              size={40}
              color={'red'}
              backgroundColor="transparent"
              iconStyle={{textAlign: 'center'}}
              style={{padding: 10}}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cover} onPress={this._onPressButton}>
          {this.state.showOperation &&
            (this.state.paused ? (
              <PlayButton onPress={() => this.doPlay()} />
            ) : (
              <PauseButton onPress={() => this.doPause()} />
            ))}
        </TouchableOpacity>
        <Video
          source={{uri: this.props.url}}
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          playWhenInactive={false}
          playInBackground={false}
          fullscreen={true}
          muted={false}
          repeat={false}
          paused={this.state.paused}
          resizeMode={'cover'}
          ignoreSilentSwitch={'ignore'}
          style={styles.backgroundVideo}
          onEnd={this.onVideoEnd}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  cover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 110,
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
});

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
    };
  }

  onTouchStart = () => {
    fetch('http://localhost:5002/video')
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          lists: this.state.lists.concat(response),
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  };

  componentDidMount() {
    fetch('http://localhost:5002/videos')
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          lists: response,
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  render() {
    const VideoLists = this.state.lists.map((item, index) => {
      return (
        <View style={styles.slide} key={item}>
          <VideoItem style={styles.video} {...this.props} url={item.url} />
        </View>
      );
    });
    return (
      <Swiper
        style={styles.wrapper}
        horizontal={false}
        showsPagination={false}
        onScrollBeginDrag={this.onTouchStart}
        loop={false}>
        {VideoLists}
      </Swiper>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const VideoNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(VideoNavigator);
