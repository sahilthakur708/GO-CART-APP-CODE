import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('HomeScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  componentDidMount = () => {
    this.checkIfLoggedIn();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={"#E51F45"} />
      </View>
    );
  }
}
