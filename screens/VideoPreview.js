import {View, Text} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-controls';
import {useRoute} from '@react-navigation/native';

const VideoPreview = () => {
  const parameter = useRoute().params.data;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <VideoPlayer
        source={{
          uri: parameter,
          // uri : 'https://www.w3schools.com/html/mov_bbb.mp4'
        }}
        onBack={() => {
          navigation.goBack();
        }}
        paused={true}
        title="preview"
      />
    </View>
  );
};

export default VideoPreview;
