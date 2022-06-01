import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UploadScreen from './screens/UploadScreen';
import VideoPreview from './screens/VideoPreview';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FileSystem from './screens/FileSystem';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FileSystem">
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="VideoPreview" component={VideoPreview} />
        <Stack.Screen name="FileSystem" component={FileSystem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
