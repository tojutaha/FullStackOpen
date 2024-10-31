import React from 'react';
import Main from './src/components/Main';
import { AppRegistry, Platform } from "react-native";

AppRegistry.registerComponent('main', () => App);

const App = () => {
  return <Main />;
}

export default App;
