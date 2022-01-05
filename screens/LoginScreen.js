import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import firebase from 'firebase';
import { AdMobRewarded } from 'expo-ads-admob';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      secureTextEntry: true,
    };
  }
  showRewardedAndroid = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-2287594817055137/8373684623');
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };
  changeSecureText = () => {
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  };
  userLogin = (emailId, password) => {
    if (this.state.emailId && this.state.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(emailId, password)
        .then(() => {
          this.props.navigation.replace('HomeScreen');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert('Invalid!', errorMessage);
        });
    } else {
      Alert.alert('Invalid!', 'Please fill all the details!');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <ScrollView>
          <Image
            source={require('../Images/logo.png')}
            style={{
              width: '100%',
              height: 260,
              alignSelf: 'center',
              marginTop: '30%',
            }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: -50,
            }}>
            Login Now
          </Text>
          <Text style={{ color: 'grey', textAlign: 'center', marginTop: 5 }}>
            Please enter the details below to continue.
          </Text>

          <TextInput
            style={{
              backgroundColor: '#EAEAEA',
              width: '80%',
              alignSelf: 'center',
              marginTop: 30,
              height: 40,
              borderRadius: 10,
              paddingLeft: 20.5,
            }}
            placeholder="Email"
            onChangeText={(val) => {
              this.setState({ emailId: val });
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EAEAEA',
              width: '80%',
              alignSelf: 'center',
              marginTop: 20,
              height: 40,
              borderRadius: 10,
              paddingLeft: 20.5,
              alignItems: 'center',
              padding: 5,
            }}>
            <TextInput
              style={{ width: '85%', height: 35 }}
              placeholder="Password"
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
            />
            <TouchableOpacity onPress={this.changeSecureText}>
              {this.state.secureTextEntry ? (
                <Icon name="eye-off" size={24} />
              ) : (
                <Icon name="eye" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 14,
              color: '#E51F45',
              alignSelf: 'flex-end',
              marginRight: '10%',
            }}
            onPress={() => {
              this.props.navigation.replace('ResetPasswordScreen');
            }}>
            Forgot Password?
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
              this.showRewardedAndroid();
            }}
            style={{
              backgroundColor: '#E51F45',
              borderRadius: 20,
              width: '65%',
              alignSelf: 'center',
              height: 42,
              marginTop: 15,
              justifyContent: 'center',
              paddingBottom: 5,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 22,
                justifyContent: 'center',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              marginTop: '10%',
              marginBottom: '8%',
            }}
            onPress={() => {
              this.props.navigation.replace('SignUpScreen');
            }}>
            Don't have an account! 
            <Text style={{ color: '#E51F45', fontWeight: 'bold' }}>
            {" "}Register
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
