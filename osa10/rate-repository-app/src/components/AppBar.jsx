import React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    style: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

const Tab = ({ text, url }) => {
  return (
    <Link to={url} component={Pressable}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

const AppBar = () => {
  return (<View style={styles.container}>
    <ScrollView horizontal>
      <Tab text='Repositories' url='/' />
      <Tab text='Sign in' url='/signin' />
    </ScrollView>
  </View>);
};

export default AppBar;