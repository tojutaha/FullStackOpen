import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    height: '100px',
  },
  text: {
    paddingTop: '60px',
    paddingLeft: '10px',
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  }</View>;
};

export default AppBar;