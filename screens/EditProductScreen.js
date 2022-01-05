import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { AdMobRewarded } from 'expo-ads-admob';
import { Ionicons } from '@expo/vector-icons';

export default class EditProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      product: [],

      email: firebase.auth().currentUser.email,
      status: '',
      category: '',

      cost: '',
      name: '',

      old: '',
      size: '',
      weight: '',
      discription: '',

      contact: '',
    };
  }
  showRewardedAndroid = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-2287594817055137/8373684623'); // Test ID, Replace with your-admob-unit-id
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };
  getProduct = async () => {
    var temp = await db.collection('products').doc(this.state.id).get();
    this.setState({
      product: temp.data(),
      name: temp.data().name,
      status: temp.data().status,
      category: temp.data().category,
      cost: temp.data().cost,
      old: temp.data().old,
      size: temp.data().size,
      weight: temp.data().weight,
      discription: temp.data().discription,
      contact: temp.data().contact,
    });
  };

  saveProducts = () => {
    db.collection('products').doc(this.state.id).update({
      category: this.state.category,
      name: this.state.name,
      cost: this.state.cost,
      old: this.state.old,
      size: this.state.size,
      weight: this.state.weight,
      discription: this.state.discription,
      contact: this.state.contact,
      status: this.state.status,
    });
    Alert.alert('Note!', 'Changes will be updated soon');
    this.props.navigation.navigate('ProductsUploadingScreen');
  };

  componentDidMount = () => {
    this.getProduct();
  };

  render() {
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
                marginLeft: '10%',
                alignItems: 'center',
                marginTop: '12%',
              }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Ionicons name="arrow-back-outline" size={28} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: '18%',
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
                marginTop: '17%',
                paddingBottom: 14,
              }}>
              Edit
            </Text>
          </View>
        </LinearGradient>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 10,
                color: 'black',
                paddingBottom: 10,
                alignSelf: 'center',
                marginTop: '5%',
              }}>
              You can edit Product Details here
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  width: '80%',
                  marginTop: '8%',
                  height: '3.5%',
                  justifyContent: 'center',
                }}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.category}
                  style={{
                    width: '80%',
                    height: 50,
                    marginBottom: '0.5%',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontColor: 'white',
                    alignSelf: 'center',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      category: itemValue,
                    })
                  }>
                  <Picker.Item label="Category" value="" />
                  <Picker.Item label="Electronics" value="Electronics" />
                  <Picker.Item label="Clothes" value="Clothes" />
                  <Picker.Item label="Appliances" value="Appliances" />
                  <Picker.Item label="Sports" value="Sports" />
                  <Picker.Item label="Education" value="Education" />
                  <Picker.Item label="Tools" value="Tools" />
                  <Picker.Item label="Jewelry" value="Jewelry" />
                  <Picker.Item label="Ornaments" value="Ornaments" />
                  <Picker.Item label="Toys" value="Toys" />
                </Picker>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: '80%',
                  marginTop: '12%',
                  height: '3.5%',
                  justifyContent: 'center',
                }}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.status}
                  style={{
                    width: '80%',
                    height: 50,
                    marginBottom: '0.5%',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontColor: 'white',
                    alignSelf: 'center',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      status: itemValue,
                    })
                  }>
                  <Picker.Item label="Status" value="" />
                  <Picker.Item label="Available" value="Available" />
                  <Picker.Item label="Rented" value="Rented" />
                  <Picker.Item label="Sold" value="Sold" />
                </Picker>
              </View>
              <TextInput
                value={this.state.name}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  borderWidth: 1,
                }}
                maxLength={35}
                placeholder="Name of Your Product"
                onChangeText={(val) => {
                  this.setState({ name: val });
                }}
              />

              <TextInput
                value={this.state.cost}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  fontSize: 13,
                  borderWidth: 1,
                }}
                maxLength={8}
                placeholder="Cost Per Day (rupees)"
                onChangeText={(val) => {
                  this.setState({ cost: val });
                }}
              />
              <TextInput
                value={this.state.old}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  borderWidth: 1,
                }}
                placeholder="old/e.g. 3 Months / New"
                onChangeText={(val) => {
                  this.setState({ old: val });
                }}
              />
              <TextInput
                value={this.state.size}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  borderWidth: 1,
                }}
                placeholder="Size"
                onChangeText={(val) => {
                  this.setState({ size: val });
                }}
              />
              <TextInput
                value={this.state.weight}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  borderWidth: 1,
                }}
                placeholder="Weight"
                onChangeText={(val) => {
                  this.setState({ weight: val });
                }}
              />

              <TextInput
                value={this.state.contact}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 40,
                  borderRadius: 10,
                  paddingLeft: 20.5,
                  borderWidth: 1,
                }}
                maxLength={20}
                placeholder="e.g. +91 8888888888"
                onChangeText={(val) => {
                  this.setState({ contact: val });
                }}
              />

              <TextInput
                value={this.state.discription}
                style={{
                  backgroundColor: '#EAEAEA',
                  width: '85%',
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 300,
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: '5%',
                  borderWidth: 1,
                }}
                multiline
                numberOfLines={8}
                placeholder="Description"
                onChangeText={(val) => {
                  this.setState({ discription: val });
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.saveProducts();
                  this.showRewardedAndroid();
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
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
