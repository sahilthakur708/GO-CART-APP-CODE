import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

export default class InteresSentForProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  getProducts = async () => {
    this.setState({ products: [] });
    var resp = await db
      .collection('Interests')
      .where('renterEmail', '==', firebase.auth().currentUser.email)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.products;
      var doc = d.data();
      doc.id = d.id;
      temp.push(doc);
      this.setState({ products: temp });
    });
  };
  componentDidMount = () => {
    this.getProducts();
  };
  render() {
    if (this.state.products.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <LinearGradient
            colors={['#AD89DE', '#F36161']}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginLeft: '5%',
                  alignItems: 'center',
                  marginTop: '6%',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={26} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: '4%',
                  fontSize: 19,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '8.2%',
                  paddingBottom: 5,
                }}>
                Interests Sent For Products
              </Text>
            </View>
          </LinearGradient>
          <Text style={{ marginTop: '70%', marginLeft: '20%' }}>
            No interests sent for products
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <LinearGradient
            colors={['#AD89DE', '#F36161']}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginLeft: '5%',
                  alignItems: 'center',
                  marginTop: '6%',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={26} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: '4%',
                  fontSize: 19,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '8.2%',
                  paddingBottom: 5,
                }}>
                Interests Sent For Products
              </Text>
            </View> 
          </LinearGradient>
          <ScrollView>
            {this.state.products.map((d) => {
              var color = 'white';
              if (d.status === 'Interested in Renting') {
                color = '#E1800D';
              } else if (d.status === 'Accepted') {
                color = '#44C80D';
              } else if (d.status === 'Rejected') {
                color = '#FD2C26';
              } else if (d.status === 'Already in use') {
                color = '#FDDA26';
              } else {
                color = 'grey';
              }
              return (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 20,
                      shadowColor: '#000',

                      shadowOffset: {
                        width: 8,
                        height: 10,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 20.32,
                      elevation: 1,
                      borderRadius: 8,
                      borderBottomLeftRadius: 16,
                      marginBottom: 10,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={{ uri: d.image }}
                        style={{
                          width: 100,
                          height: 110,
                          borderRadius: 6,
                          margin: 10,
                          marginTop: 10,
                        }}
                      />
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              color: 'blue',
                              fontSize: 14.5,
                              fontWeight: 'bold',
                              margin: 8,
                              alignSelf: 'center',
                              width: 150,
                              marginLeft: 9,
                            }}>
                            {d.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '100',
                            marginLeft: 8.8,
                            width: 200,
                            color: 'grey',
                          }}>
                          Requester name-{d.renterName}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            style={{
                              marginLeft: 8.8,
                              backgroundColor: '#F26A68',
                              marginTop: '3%',
                              width: 50,
                              height: 35,
                              justifyContent: 'center',
                              borderRadius: 14,
                              alignItems: 'center',
                              paddingRight: '1%',
                            }}
                            onPress={() => {
                              var phoneNumber = d.ownerContact;

                              if (Platform.OS === 'android') {
                                var num = d.ownerContact;
                                phoneNumber = 'tel:${' + num + '}';
                              } else {
                                phoneNumber = 'telprompt:${' + num + '}';
                              }

                              Linking.openURL(phoneNumber);
                            }}>
                            <Feather
                              name="phone-call"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              marginLeft: 10,
                              backgroundColor: '#F26A68',
                              marginTop: '3%',
                              width: 50,
                              height: 35,
                              justifyContent: 'center',
                              borderRadius: 14,
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              Linking.openURL('mailTo:' + d.ownerEmail)
                            }>
                            <MaterialIcons
                              name="email"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginLeft: 10,
                              color: '#F15F5E',
                              marginTop: '2%',
                              alignSelf: 'center',
                              width: 200,
                            }}>
                            Owner's Price ₹ {d.price}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#F15F5E',
                              marginTop: '1%',
                              alignSelf: 'center',
                              width: 180,
                              marginBottom: '2%',
                              marginLeft: '-5%',
                            }}>
                            Your Price ₹ {d.renterPrice}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '100',
                            marginTop: '1%',
                            marginLeft: '-15%',
                            color: 'white',
                            backgroundColor: color,
                            width: 150,
                            height: 30,
                            alignSelf: 'center',
                            paddingTop: 4,
                            paddingLeft: 5,
                            borderRadius: 10,
                            marginBottom: 10,
                            textAlign:'center'
                          }}>
                          {d.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
