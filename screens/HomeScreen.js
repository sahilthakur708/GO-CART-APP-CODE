import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';
import { Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const category = [
  {
    id: '01',
    name: 'Electronics',
    image: <MaterialIcons name="tv" size={27} color="black" />,
  },
  {
    id: '02',
    name: 'Sports',
    image: <MaterialCommunityIcons name="cricket" size={28} color="black" />,
  },
  {
    id: '03',
    name: 'Jewelry',
    image: <MaterialCommunityIcons name="gold" size={28} color="black" />,
  },
  {
    id: '04',
    name: 'Toys',
    image: <AntDesign name="car" size={25} color="black" />,
  },
  {
    id: '05',
    name: 'Education',
    image: <Entypo name="book" size={25} color="black" />,
  },
  {
    id: '06',
    name: 'Clothes',
    image: <Ionicons name="shirt-outline" size={25} color="black" />,
  },
  {
    id: '07',
    name: 'Ornaments',
    image: <MaterialCommunityIcons name="ornament" size={26} color="black" />,
  },
  {
    id: '08',
    name: 'Appliances',
    image: <MaterialCommunityIcons name="fridge" size={26} color="black" />,
  },
  {
    id: '09',
    name: 'Tools',
    image: <Octicons name="tools" size={26} color="black" />,
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  getProducts = async () => {
    this.setState({ products: [] });
    var resp = await db.collection('products').get();
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
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: '#FAFAFA',
            }}>
            <LinearGradient
              colors={['#AD89DE', '#F36161']}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: '#FAFAFA',
                paddingTop: 35,
                paddingBottom: 15,
              }}>
              <View style={{ marginLeft: '5%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Hello, There!
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: '100', color: 'white' }}>
                  {firebase.auth().currentUser.displayName
                    ? firebase.auth().currentUser.displayName
                    : 'Sahil'}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  marginRight: '5%',
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={25} color="black" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <ScrollView horizontal={true}>
            {category.map((d) => {
              return (
                <View
                  style={{
                    marginHorizontal: 8,
                    marginBottom: '8%',
                    marginTop: '1.5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('CategoryScreen', {
                        category: d.name,
                      });
                    }}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 30,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}>
                    {d.image}
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'center' }}>{d.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          <ScrollView style={{ marginTop: '-50%' }}>
            <Text style={{ alignSelf: 'center' }}>
              Sorry! We have no products available
            </Text>
          </ScrollView>
        </View>
      );
    } else {
      var products = this.state.products.slice(0, 3);

      return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: '#FAFAFA',
            }}>
            <LinearGradient
              colors={['#AD89DE', '#F36161']}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: '#FAFAFA',
                paddingTop: 35,
                paddingBottom: 15,
              }}>
              <View style={{ marginLeft: '5%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Hello, There!
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: '100', color: 'white' }}>
                  {firebase.auth().currentUser.displayName
                    ? firebase.auth().currentUser.displayName
                    : 'Sahil'}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  marginRight: '5%',
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={25} color="black" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <ScrollView horizontal={true}>
            {category.map((d) => {
              return (
                <View
                  style={{
                    marginHorizontal: 8,
                    marginBottom: '8%',
                    marginTop: '1.5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('CategoryScreen', {
                        category: d.name,
                      });
                    }}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 30,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}>
                    {d.image}
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'center' }}>{d.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '1%',
            }}>
            <Text
              style={{
                marginLeft: '5%',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Recommended
            </Text>
            <Text
              style={{
                marginRight: '6%',
                fontWeight: '600',
              }}></Text>
          </View>
          <ScrollView>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              {products.map((d) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('CategoryDetailsScreen', {
                        productId: d.id,
                      });
                    }}
                    style={{
                      flex: 2,
                      marginTop: '5%',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      width: 350,
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={{ uri: d.image1 }}
                      style={{
                        width: 350,
                        height: 355,
                        borderRadius: 6,
                        alignSelf: 'center',
                      }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          marginLeft: '2%',
                          marginTop: '7%',
                        }}>
                        {d.name}
                      </Text>
                      <Text
                        style={{
                          marginLeft: '4%',
                          color: '#F28887',
                          fontSize: 18.5,
                          fontWeight: 'bold',
                          marginTop: '7.5%',
                          width: 100,
                        }}>
                        ₹{d.cost}/day
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 17,
                          marginLeft: '2%',
                          marginTop: 15,
                          color: '#C8C7CD',
                        }}>
                        {d.status}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 20,
                          marginTop: 15,
                          fontSize: 16,
                          color: '#C8C7CD',
                        }}>
                        {d.verified}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 20,
                          marginTop: 15,
                          fontSize: 16,
                          color: '#C8C7CD',
                        }}>
                        {d.old}/old
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 17,
                          marginLeft: '2%',
                          marginTop: '2%',
                          color: '#C8C7CD',
                        }}>
                        {d.size}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: '6%',
                          marginTop: '2%',
                          color: '#C8C7CD',
                        }}>
                        {d.category}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: '2%',
                        marginTop: '2%',
                        width: 350,
                        marginBottom: 20,
                        color: 'grey',
                      }}>
                      {d.discription.slice(0, 52)}...
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
