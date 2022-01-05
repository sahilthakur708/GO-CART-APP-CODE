import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Navigations/Navigate';

export default class App extends React.Component {
  render() { 
    return (
      <NavigationContainer> 
        <MainStack />
      </NavigationContainer>
    );
  }
}

// how to find rating of 5 star (sum of all the ratings given by each user*5/(total ratings*5))
