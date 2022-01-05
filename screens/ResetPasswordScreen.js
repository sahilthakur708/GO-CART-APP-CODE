import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default class ResetPasswordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: '#F2F2F2',
        }}>
        <TouchableOpacity
          style={{ marginTop: '15%', marginLeft: '3%' }}
          onPress={() => {
            this.props.navigation.replace('LoginScreen');
          }}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../Images/logo.png')}
          style={{
            width: '80%',
            height: '46%',
            alignSelf: 'center',

            marginRight: 15,
          }}
        />
        <TextInput
          style={{
            backgroundColor: '#EAEAEA',
            width: '85%',
            alignSelf: 'center',
            marginTop: '-18%',
            height: 40,
            borderRadius: 10,
            paddingLeft: 20.5,
          }}
          placeholder="Enter email"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#E51F45',
            borderRadius: 20,
            width: '60%',
            alignSelf: 'center',
            height: 40,
            marginTop: 20,
            justifyContent: 'center',
            paddingBottom: 5,
          }}
          onPress={() => {
            if (this.state.email.length < 10) {
              Alert.alert('Invalid!', 'Please enter a valid email');
            } else {
              firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  return Alert.alert('Invalid!', errorMessage);
                });
              Alert.alert(
                'Reset Password Mail Sent',
                'Reset Password mail sent! check your email'
              );
            }
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              paddingTop: 4,
            }}>
            Send Reset Email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
