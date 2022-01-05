import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      image:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      email: firebase.auth().currentUser.email,
      name: '',
    };
  }
  showRewardedAndroid = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-2287594817055137/8373684623');
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };
  showInterstitialAndroid = async () => {
    await AdMobInterstitial.setAdUnitID(
      'ca-app-pub-2287594817055137/3157016962'
    );
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };
  getProfile = async () => {
    var temp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();
    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        image: obj.image,
        name: obj.name,
      });
    });
  };
  componentDidMount = () => {
    this.getProfile();
    this.showInterstitialAndroid();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F2F2F2',
        }}>
        <LinearGradient
          colors={['#AD89DE', '#F36161']}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
            paddingBottom: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                marginLeft: '5%',
                width: 45,
                height: 45,
                alignItems: 'center',
                marginTop: '10%',
              }}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Entypo name="list" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: '15%',
                fontSize: 24,
                color: 'white',
                fontWeight: 'bold',
                marginTop: '14%',
                paddingBottom: 20,
              }}>
              Settings
            </Text>
          </View>
        </LinearGradient>
        <View>
          <Image
            source={{ uri: this.state.image }}
            style={{
              width: 160,
              height: 160,
              alignSelf: 'center',
              borderRadius: 100,
              marginBottom: 10,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: '4%',
              alignSelf: 'center',
            }}>
            {this.state.name}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginTop: '5%',
            height: '8%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 12,
          }}
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen');
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: '8%',
                paddingTop: '2%',
              }}>
              Edit Profile
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: '8%',
                  fontWeight: '100',
                  fontSize: 12,
                  marginTop: '0.5%',
                }}>
                Name, Email, Address, Contact, Profile Image etc.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginTop: '0.5%',
            height: '8%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 12,
          }}
          onPress={() => {
            this.props.navigation.navigate('InterestRecievedForProductsScreen');
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: '8%',
                paddingTop: '2%',
              }}>
              Interests
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: '8%',
                  fontWeight: '100',
                  fontSize: 12,
                }}>
                View and Manage interests received for your products
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginTop: '0.5%',
            height: '8%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 12,
          }}
          onPress={() => {
            this.props.navigation.navigate('ProductsUploadingScreen');
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: '8%',
                paddingTop: '2%',
              }}>
              Products
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: '8%',
                  fontWeight: '100',
                  fontSize: 12,
                  marginTop: '0.5%',
                }}>
                Manage your products
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginTop: '0.5%',
            height: '8%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 12,
          }}
          onPress={() => {
            this.props.navigation.navigate('AboutUsScreen');
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: '8%',
                paddingTop: '2%',
              }}>
              About Us
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: '8%',
                  fontWeight: '100',
                  fontSize: 12,
                  marginTop: '0.5%',
                }}>
                Know more about us and the vision of our company
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            width: '50%',
            alignSelf: 'center',
            backgroundColor: '#E51F45',
            marginTop: '10%',
            borderRadius: 12,
          }}
          onPress={() => {
            this.showRewardedAndroid();
            this.props.navigation.navigate('LoginScreen');
            firebase.auth().signOut();
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 22,
              fontWeight: 'bold',
              color: 'white',
              paddingTop: '4%',
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
