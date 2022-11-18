import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet, 
} from 'react-native';

const ImgBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}>
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }, 
});

export default memo(ImgBackground);