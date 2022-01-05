import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView, 
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Icon from '@expo/vector-icons/Feather';
import { AdMobRewarded } from 'expo-ads-admob';

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      name: '',
      address: '',
      contact: '',
      confirmPassword: '',
      country: '',
      city: '',
      pincode: '',
      secureTextEntry: true,
      secureTextEntry2: true,
    };
  }
  showRewardedAndroid = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-2287594817055137/8373684623'); // Test ID, Replace with your-admob-unit-id
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };
  userSignUp = () => {
    if (
      this.state.emailId &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.name &&
      this.state.address &&
      this.state.country &&
      this.state.contact &&
      this.state.city &&
      this.state.pincode
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.emailId, this.state.password)
        .then((userCredential) => {
          db.collection('users').add({
            name: this.state.name,
            email: this.state.emailId,
            contact: this.state.contact,
            address: this.state.address,
            city: this.state.city,
            pincode: this.state.pincode,
            country: this.state.country,
            image:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          });
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: this.state.name });
          Alert.alert('Welcome!', 'Welcome to Go Cart!');
          this.props.navigation.replace('HomeScreen');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert('Invalid!', errorMessage);
        });
    } else {
      Alert.alert('Invalid!', 'Please fill all the details!');
    }
  };
  changeSecureText1 = () => {
    // ! - not
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  };
  changeSecureText2 = () => {
    // ! - not
    this.setState({ secureTextEntry2: !this.state.secureTextEntry2 });
  };
  render() {
    return (
      <View 
        style={{
          flex: 1,
          backgroundColor: '#F2F2F2',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '15%',
              color: 'black',
            }}>
            Sign Up
          </Text>
          <Text style={{ color: 'black', textAlign: 'center', marginTop: 5 }}>
            Please enter the details below to continue.
          </Text>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <TextInput
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 25,
                  height: 35,
                  borderRadius: 10,
                  paddingLeft: 20,
                }}
                placeholder={'Name'}
                maxLength={16}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Contact no.'}
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Address'}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Country'}
                onChangeText={(text) => {
                  this.setState({
                    country: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'City'}
                multiline={false}
                onChangeText={(text) => {
                  this.setState({
                    city: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Pin code'}
                onChangeText={(text) => {
                  this.setState({
                    pincode: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Email'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 20,
                  height: 35,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  alignItems: 'center',
                  padding: 5,
                }}>
                <TextInput
                  style={{ width: '85%', height: '100%' }}
                  placeholder={'Password'}
                  secureTextEntry={this.state.secureTextEntry}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                />
                <TouchableOpacity onPress={this.changeSecureText1}>
                  {this.state.secureTextEntry ? (
                    <Icon name="eye-off" size={24} />
                  ) : (
                    <Icon name="eye" size={24} />
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 20,
                  height: 35,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  alignItems: 'center',
                  padding: 5,
                }}>
                <TextInput
                  style={{ width: '85%', height: '100%' }}
                  placeholder={'Confirm Password'}
                  secureTextEntry={this.state.secureTextEntry2}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                />
                <TouchableOpacity onPress={this.changeSecureText2}>
                  {this.state.secureTextEntry2 ? (
                    <Icon name="eye-off" size={24} />
                  ) : (
                    <Icon name="eye" size={24} />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: '#E51F45',
                  borderRadius: 20,
                  width: '70%',
                  alignSelf: 'center',
                  height: 40,
                  marginTop: '10%',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (this.state.password === this.state.confirmPassword) {
                    this.userSignUp();
                    this.showRewardedAndroid();
                  } else {
                    Alert.alert('Invalid!', "Passwords don't match");
                  }
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 22,
                    marginBottom: 3,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: '5%',
                  marginBottom: '15%',
                  color: 'black',
                }} 
                onPress={() => {
                  this.props.navigation.replace('LoginScreen');
                }}>
                Already have an account? 
                <Text
                  style={{
                    color: '#E51F45',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                   {" "}Login
                </Text>
              </Text>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formTextInput: {
    backgroundColor: '#EAEAEA',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    height: 35,
    borderRadius: 10,
    paddingLeft: 20,
  },
});
