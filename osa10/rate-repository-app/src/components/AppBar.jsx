import React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZEDUSER } from '../graphql/queries';

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

const Tab = ({ text, url, visible }) => {

  if(!visible) {
    return null;
  }

  return (
    <Link to={url} component={Pressable}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

const AppBar = () => {

  const { data } = useQuery(GET_AUTHORIZEDUSER, {
    fetchPolicy: 'cache-and-network',
  });

  // console.log("DATA: ", data);
  const loggedIn = data && data.me;

  return (<View style={styles.container}>
    <ScrollView horizontal>
      <Tab text='Repositories' url='/' visible='true' />
      <Tab text='Sign in' url='/signin' visible={!loggedIn} />
      <Tab text='Sign out' url='/signout' visible={loggedIn} />
    </ScrollView>
  </View>);
};

export default AppBar;