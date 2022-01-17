import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

export default class InterestRecievedForProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productIdToModify: '',
      modalVisible: false,
      status: '',
    };
  }
  
  getProducts = async () => {
    this.setState({ products: [] });
    var resp = await db
      .collection('Interests')
      .where('ownerEmail', '==', firebase.auth().currentUser.email)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.products;
      var doc = d.data();
      doc.id = d.id;
      temp.push(doc);
      this.setState({ products: temp });
    });
  };
  updateStatus = () => {
    db.collection('Interests').doc(this.state.productIdToModify).update({
      status: this.state.status,
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
                  marginTop: '8%',
                  paddingBottom: 5,
                }}>
                Interests Received For Products
              </Text>
            </View>
          </LinearGradient>
          <Text style={{ marginTop: '70%', marginLeft: '20%' }}>
            No interests received for your products
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
                  marginLeft: '10%',
                  fontSize: 19,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '8%',
                  paddingBottom: 5,
                }}>
                Interests Received For Products
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
                            fontWeight: '1',
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
                              var phoneNumber = d.renterContact;

                              if (Platform.OS === 'android') {
                                var num = d.renterContact;
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
                              Linking.openURL('mailTo:' + d.renterEmail)
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
                            Renter Price ₹ {d.renterPrice}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#F15F5E',
                              marginTop: '1%',
                              alignSelf: 'center',
                              width: 150,
                              marginBottom: '2%',
                              marginLeft: '5%',
                            }}>
                            Your Price ₹ {d.price}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                modalVisible: true,
                                productIdToModify: d.id,
                              });
                            }}
                            style={{ marginLeft: '-5%', marginBottom: '2%' }}>
                            <AntDesign name="edit" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '1',
                            marginLeft: 8,
                            marginTop: '1%',
                            color: 'white',
                            backgroundColor: color,
                            width: 150,
                            height: 30,
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            style={{ backgroundColor: 'white' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                marginTop: '10%',
              }}>
              <TouchableOpacity
                style={{ marginTop: '5%', marginLeft: '5%' }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    status: 'Accepted',
                  })
                }
                style={{
                  borderRadius: 20,
                  width: '40%',
                  alignSelf: 'center',
                  height: 40,
                  marginTop: '6%',
                  justifyContent: 'center',
                  paddingBottom: 4,
                  marginBottom: '8%',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                    fontSize: 20,
                  }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    status: 'Rejected',
                  })
                }
                style={{
                  borderRadius: 20,
                  width: '40%',
                  alignSelf: 'center',
                  height: 40,
                  marginTop: '6%',
                  justifyContent: 'center',
                  paddingBottom: 4,
                  marginBottom: '8%',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                    fontSize: 20,
                  }}>
                  Reject
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    status: 'Already in use',
                  })
                }
                style={{
                  borderRadius: 20,
                  width: '45%',
                  alignSelf: 'center',
                  height: 40,
                  marginTop: '6%',
                  justifyContent: 'center',
                  paddingBottom: 4,
                  marginBottom: '8%',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                    fontSize: 20,
                  }}>
                  Already Rented
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.status.length <= 0) {
                    Alert.alert('Invalid!', 'Please Enter a Valid Status');
                  } else {
                    this.updateStatus();
                    Alert.alert(
                      'Important!',
                      'If you have accepted the renting request then you have to deliver the product to the requesters house.You can contact                        them by phone or email.Update the product status in upload your product screen if you have accepted the product interest'
                    );
                    this.setState({
                      modalVisible: false,
                    });
                    this.getProducts();
                  }
                }}
                style={{
                  backgroundColor: '#E51F45',
                  borderRadius: 20,
                  width: '70%',
                  alignSelf: 'center',
                  height: 45,
                  marginTop: '6%',
                  justifyContent: 'center',
                  paddingBottom: 5,
                  marginBottom: '8%',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
  }
}
