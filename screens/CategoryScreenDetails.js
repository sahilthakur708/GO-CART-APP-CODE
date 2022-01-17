import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';

export default class CategoryDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      productId: this.props.route.params.productId,
      price: '',
      renterContact: '',
    };
  }

  getProducts = async () => {
    var resp = await db.collection('products').doc(this.state.productId).get();
    this.setState({ product: [] });

    var temp = this.state.product;
    var doc = resp.data();
    doc.id = resp.id;
    temp.push(doc);
    this.setState({ product: temp });
  };

  getProfile = async () => {
    var resp = await db
      .collection('users')
      .where('email', '==', firebase.auth().currentUser.email)
      .get();
    resp.docs.map((d) => {
      this.setState({
        renterContact: d.data().contact,
      });
    });
  };

  addInterest = async () => {
    db.collection('Interests').add({
      productId: this.state.product[0].id,
      image: this.state.product[0].image1,
      name: this.state.product[0].name,
      price: this.state.product[0].cost,
      ownerEmail: this.state.product[0].email,
      ownerContact: this.state.product[0].contact,
      renterName: firebase.auth().currentUser.displayName,
      renterEmail: firebase.auth().currentUser.email,
      renterContact: this.state.renterContact,
      renterPrice: this.state.price,
      status: 'Interested in Renting',
    });
  };

  componentDidMount = async () => {
    this.getProducts();
    this.getProfile();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <LinearGradient colors={['#AD89DE', '#F36161']}>
          <TouchableOpacity
            style={{
              height: 50,
              flexDirection: 'row',
              paddingTop: '2%',
              paddingRight: '5%',
              marginTop: '7%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 17,
                justifyContent: 'center',
                marginRight: '20%',
                width: 40,
                height: 40,
                alignItems: 'center',
                borderColor: 'grey',
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={26} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: '-15%',
                marginTop: '2.5%',
              }}>
              Product Details
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView>
          {this.state.product.map((d) => {
            var images = [d.image1, d.image2];
            return (
              <View style={{}}>
                <SliderBox
                  ImageComponentStyle={{
                    alignSelf: 'center',
                    width: '100%',
                  }}
                  images={images}
                  sliderBoxHeight={400}
                  dotColor="black"
                  inactiveDotColor="#90A4AE"
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    padding: 0,
                    margin: 0,
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: '3%',
                      marginTop: '1%',
                      color: '#585767',
                    }}>
                    {d.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      marginLeft: '2%',
                      marginTop: '0.5%',
                      color: '#F17E7F',
                      width: '27%',
                    }}>
                    ₹{d.cost}/day
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '3%',
                      marginTop: '6%',
                      color: '#D4D3D6',
                    }}>
                    <Text style={{ color: 'black' }}> Seller email-id</Text>-
                    {d.email}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                      marginTop: '3%',
                      color: '#D4D3D6',
                    }}>
                    {d.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                      marginTop: '3%',
                      color: '#D4D3D6',
                    }}>
                    {d.verified}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                      marginTop: '3%',
                      color: '#D4D3D6',
                    }}>
                    <Text style={{ color: 'black' }}> Category</Text>-
                    {d.category}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '3%',
                      marginTop: '5%',
                      color: '#D4D3D6',
                    }}>
                    <Text style={{ color: 'black' }}> Old/New </Text>- {d.old}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                      marginTop: '5%',
                      color: '#D4D3D6',
                    }}>
                    <Text style={{ color: 'black' }}> Weight</Text> - {d.weight}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: '3%',
                    marginTop: '2%',
                    color: '#D4D3D6',
                  }}>
                  <Text style={{ color: 'black' }}> Dimensions</Text> - {d.size}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    marginLeft: '4%',
                    marginTop: '5%',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: '2%',
                    color: '#D4D3D6',
                    marginLeft: '4%',
                    width: '90%',
                  }}>
                  {d.discription}
                </Text>
                <Text
                  style={{
                    marginTop: '5%',
                    fontWeight: 'bold',
                    marginLeft: '4%',
                    fontSize: 22,
                  }}>
                  Contact
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: '10%' }}>
                  <TouchableOpacity
                    style={{
                      marginLeft: '3.5%',
                      backgroundColor: '#F26A68',
                      marginTop: '5%',
                      width: '27%',
                      height: '30%',
                      justifyContent: 'center',
                      borderRadius: 14,
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      Linking.openURL(
                        'mailTo:' +
                          d.email +
                          '?subject=Buying Product from Go Cart&body=Hi, I am interested in buying the product ' +
                          d.name +
                          'cost - ' +
                          d.cost
                      )
                    }>
                    <MaterialIcons name="email" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginLeft: '6%',
                      backgroundColor: '#F26A68',
                      marginTop: '5%',
                      width: '27%',
                      height: '30%',
                      justifyContent: 'center',
                      borderRadius: 14,
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      Linking.openURL(
                        'sms:' +
                          d.contact +
                          '?body=Hi, I am interested in buying the product ' +
                          d.name +
                          'cost - ' +
                          d.cost
                      )
                    }>
                    <MaterialIcons name="textsms" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginLeft: '6%',
                      backgroundColor: '#F26A68',
                      marginTop: '5%',
                      width: '27%',
                      height: '30%',
                      justifyContent: 'center',
                      borderRadius: 14,
                      alignItems: 'center',
                      paddingRight: '1%',
                    }}
                    onPress={() => {
                      var phoneNumber = d.contact;

                      if (Platform.OS === 'android') {
                        var num = d.contact;
                        phoneNumber = 'tel:${' + num + '}';
                      } else {
                        phoneNumber = 'telprompt:${' + num + '}';
                      }

                      Linking.openURL(phoneNumber);
                    }}>
                    <Feather name="phone-call" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View>
          <TextInput
            style={{
              borderBottomWidth: 2,
              width: '80%',
              alignSelf: 'center',
              marginTop: 30,
              height: 40,
              borderRadius: 10,
              paddingLeft: 20.5,
            }}
            keyboardType="numeric"
            placeholder="Your Price?"
            onChangeText={(val) => {
              this.setState({ price: val });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.product[0].email ===
                firebase.auth().currentUser.email
              ) {
                Alert.alert(
                  'Sorry!',
                  'You can not send interest to your product'
                );
              } else if (this.state.price) {
                this.addInterest();
                Alert.alert(
                  'Interest Sent Successfully!',
                  'you can check your interest in the interest Recieved/Sent for products screen.If the status is accepted then Contact Seller to deliver the product to your house'
                );
              } else {
                Alert.alert('Invalid!', 'Please enter a valid price');
              }
            }}
            style={{
              marginTop: 2,
              alignSelf: 'center',
              backgroundColor: '#F36161',
              height: 50,
              width: 190,
              justifyContent: 'center',
              borderRadius: 12,
              marginBottom: '3%',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '1%',
                textAlign:'center'
              }}>
              Send Renting Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
