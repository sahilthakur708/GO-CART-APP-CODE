import React  from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Picker,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';

export default class ProductsUploadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      category: '',
      image: '',
      image2: '',

      cost: '',
      name: '',
      model: '',
      old: '',
      size: '',
      weight: '',
      discription: '',

      uploading: 'none',
      email: firebase.auth().currentUser.email,
      uploading2: 'none',
      products: [],
      contact: '',
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
  getProducts = async () => {
    this.setState({ products: [] });
    var resp = await db
      .collection('products')
      .where('email', '==', this.state.email)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.products;
      var doc = d.data();
      doc.id = d.id;
      temp.push(doc);
      this.setState({ products: temp });
    });
  };
  delete_task = async (id) => {
    await db.collection('products').doc(id).delete();
    Alert.alert('Note!', 'Product has been Deleted');
    this.getProducts();
  };

  componentDidMount() {
    this.getProducts();
    this.showInterstitialAndroid();
  }

  selectImage = async (path, number) => {
    if (number === '1') {
      this.setState({ uploading: true });
    } else {
      this.setState({ uploading2: true });
    }

    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path, number);
    }
  };

  uploadImage = async (uri, email, path, number) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path, number);
    });
  };

  fetchImage = (email, path, number) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    storageRef
      .getDownloadURL()
      .then((url) => {
        if (number === '1') {
          this.setState({ uploading: false, image: url });
        } else {
          this.setState({ uploading2: false, image2: url });
        }
      })
      .catch((error) => {
        if (number === '1') {
          this.setState({ uploading: 'none', image: '#' });
        } else {
          this.setState({ uploading2: 'none', image2: '#' });
        }
      });
  };

  addUserProducts = () => {
    if (
      this.state.category &&
      this.state.name &&
      this.state.cost &&
      this.state.old &&
      this.state.image &&
      this.state.image2 &&
      this.state.contact &&
      this.state.discription &&
      this.state.size &&
      this.state.weight
    ) {
      db.collection('products').add({
        category: this.state.category,
        name: this.state.name,
        cost: this.state.cost,
        old: this.state.old,
        size: this.state.size,
        weight: this.state.weight,
        discription: this.state.discription,
        'model no.': this.state.model,
        image1: this.state.image,
        image2: this.state.image2,
        contact: this.state.contact,
        email: firebase.auth().currentUser.email,
        status: 'Available',
        verified: 'Not Verified',
      });
      Alert.alert('Note!', 'Product Uploaded Succesfully');
      this.setState({
        modalVisible: false,
      });
    } else {
      Alert.alert('Note!', 'Please fill all the compulsory details');
    }
  };
  render() {
    if (this.state.products.length === 0) {
      var icon;
      if (this.state.uploading === 'none') {
        icon = (
          <Entypo
            style={{ marginTop: '2%' }}
            name="upload"
            size={25}
            color="black"
          />
        );
      } else if (this.state.uploading) {
        icon = (
          <ActivityIndicator
            style={{ marginTop: '2%' }}
            size={'small'}
            color="black"
          />
        );
      } else {
        icon = (
          <Feather
            style={{ marginTop: '2%' }}
            name="check-circle"
            size={25}
            color="black"
          />
        );
      }

      var icon2;
      if (this.state.uploading2 === 'none') {
        icon2 = (
          <Entypo
            style={{ marginTop: '2%' }}
            name="upload"
            size={25}
            color="black"
          />
        );
      } else if (this.state.uploading2) {
        icon2 = (
          <ActivityIndicator
            style={{ marginTop: '2%' }}
            size={'small'}
            color="black"
          />
        );
      } else {
        icon2 = (
          <Feather
            style={{ marginTop: '2%' }}
            name="check-circle"
            size={25}
            color="black"
          />
        );
      }

      return (
        <View>
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
                  marginTop: '8%',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={26} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: '6%',
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '10.2%',
                  paddingBottom: 5,
                }}>
                Upload/Manage Products
              </Text>
            </View>
          </LinearGradient>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: '20%',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            No Products Uploaded Yet.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#E51F45',
              alignSelf: 'center',
              alignItems: 'center',
              width: 120,
              height: 50,
              borderRadius: 15,
              justifyContent: 'center',
              shadowOffset: {
                width: 6,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 20.32,
              marginTop: 40,
              marginBottom: 10,
            }}
            onPress={() => {
              this.setState({
                modalVisible: true,
                image: '',
                image2: '',
                uploading: 'none',
                uploading2: 'none',
              });
            }}>
            <View>
              <Entypo name="plus" size={35} color="white" />
            </View>
          </TouchableOpacity>
          <AdMobBanner
            style={{
              alignSelf: 'center',
              marginBottom: '1%',
              marginTop: '20%',
            }}
            bannerSize="full"
            adUnitID="ca-app-pub-2287594817055137/2403404156"
            onDidFailToReceiveAdWithError={this.bannerError}
            onAdViewDidReceiveAd={this.bannerAdReceived}
          />
          <ScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              style={{ backgroundColor: 'white' }}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    marginTop: '10%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,

                      alignItems: 'center',
                    }}>
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
                    <TextInput
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
                      placeholder="Model no.(optional)"
                      onChangeText={(val) => {
                        this.setState({ model: val });
                      }}
                    />
                    <TextInput
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
                      placeholder="Cost Per Day (In Rupees)"
                      onChangeText={(val) => {
                        this.setState({ cost: val });
                      }}
                    />
                    <TextInput
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

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          marginTop: '4%',
                        }}>
                        Upload Image 1
                      </Text>
                      <TouchableOpacity
                        style={{ marginHorizontal: 20, marginTop: '3.5%' }}
                        onPress={() => {
                          this.selectImage(
                            'image1/' + this.state.name + Math.random(),
                            '1'
                          );
                        }}>
                        {icon}
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          marginTop: '4%',
                        }}>
                        Upload Image 2
                      </Text>
                      <TouchableOpacity
                        style={{ marginHorizontal: 20, marginTop: '3.5%' }}
                        onPress={() => {
                          this.selectImage(
                            'image2/' + this.state.name + Math.random(),
                            '2'
                          );
                        }}>
                        {icon2}
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.contact.length < 10) {
                          Alert.alert(
                            'Invalid!',
                            'Please Enter a Valid Contact No.'
                          );
                        } else {
                          this.addUserProducts();
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
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </ScrollView>
        </View>
      );
    } else {
      var icon;
      if (this.state.uploading === 'none') {
        icon = (
          <Entypo
            style={{ marginTop: '2%' }}
            name="upload"
            size={25}
            color="black"
          />
        );
      } else if (this.state.uploading) {
        icon = (
          <ActivityIndicator
            style={{ marginTop: '2%' }}
            size={'small'}
            color="black"
          />
        );
      } else {
        icon = (
          <Feather
            style={{ marginTop: '2%' }}
            name="check-circle"
            size={25}
            color="black"
          />
        );
      }

      var icon2;
      if (this.state.uploading2 === 'none') {
        icon2 = (
          <Entypo
            style={{ marginTop: '2%' }}
            name="upload"
            size={25}
            color="black"
          />
        );
      } else if (this.state.uploading2) {
        icon2 = (
          <ActivityIndicator
            style={{ marginTop: '2%' }}
            size={'small'}
            color="black"
          />
        );
      } else {
        icon2 = (
          <Feather
            style={{ marginTop: '2%' }}
            name="check-circle"
            size={25}
            color="black"
          />
        );
      }

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
                  marginTop: '8%',
                }}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Entypo name="list" size={26} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: '6%',
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '10.2%',
                  paddingBottom: 5,
                }}>
                Upload/Manage Products
              </Text>
            </View>
          </LinearGradient>
          <ScrollView>
            <View>
              {this.state.products.map((d) => {
                return (
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        width: '88%',
                        alignSelf: 'center',
                        marginTop: 30,
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
                        height: '84%',
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={{ uri: d.image1 }}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 6,
                            margin: 10,
                            marginTop: 16,
                          }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                color: 'blue',
                                fontSize: 14.5,
                                fontWeight: 'bold',
                                marginBottom: 2,
                                alignSelf: 'center',
                                width: 150,
                                marginLeft: 9,
                                marginTop: 12,
                                marginRight: 8,
                              }}>
                              {d.name}{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '100',
                              marginLeft: 8.8,
                            }}>
                            Category {d.category}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '100',
                              marginLeft: 8.8,
                            }}>
                            Old/New-{d.old}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '100',
                              marginLeft: 8.8,
                            }}>
                            Contact {d.contact}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginLeft: 10,
                                color: '#F15F5E',
                                marginTop: '3%',
                                alignSelf: 'center',
                                width: 100,
                              }}>
                              ₹ {d.cost}
                            </Text>
                            <TouchableOpacity
                              style={{
                                marginTop: '3%',
                                marginBottom: '1.6%',
                                marginLeft: '8%',
                              }}
                              onPress={() => this.delete_task(d.id)}>
                              <FontAwesome
                                name="trash-o"
                                size={24}
                                color="red"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                marginTop: '3%',
                                marginBottom: '1.6%',
                                marginLeft: '8%',
                              }}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'EditProductsScreen',
                                  {
                                    id: d.id,
                                  }
                                )
                              }>
                              <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <AdMobBanner
              style={{
                alignSelf: 'center',
                marginBottom: '1%',
                marginTop: '5%',
              }}
              bannerSize="full"
              adUnitID="ca-app-pub-2287594817055137/2403404156"
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdViewDidReceiveAd={this.bannerAdReceived}
            />
          </ScrollView>

          <TouchableOpacity
            style={{
              backgroundColor: '#E51F45',
              alignSelf: 'center',
              alignItems: 'center',
              width: 120,
              height: 50,
              borderRadius: 15,
              justifyContent: 'center',
              shadowOffset: {
                width: 6,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 20.32,
              marginTop: 20,
              marginBottom: 10,
            }}
            onPress={() => {
              this.setState({
                modalVisible: true,
                image: '',
                image2: '',
                uploading: 'none',
                uploading2: 'none',
              });
            }}>
            <View>
              <Entypo name="plus" size={35} color="white" />
            </View>
          </TouchableOpacity>

          <ScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              style={{ backgroundColor: 'white' }}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    marginTop: '10%',
                  }}>
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginVertical: 10,
                      color: 'black',
                      paddingBottom: 10,
                      alignSelf: 'center',
                    }}>
                    Please add all the details for your product
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
                        marginTop: '10%',
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
                    <TextInput
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
                      placeholder="Model no.(optional)"
                      onChangeText={(val) => {
                        this.setState({ model: val });
                      }}
                    />
                    <TextInput
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

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          marginTop: '4%',
                        }}>
                        Upload Image 1
                      </Text>
                      <TouchableOpacity
                        style={{ marginHorizontal: 20, marginTop: '3.5%' }}
                        onPress={() => {
                          this.selectImage(
                            'image1/' + this.state.name + Math.random(),
                            '1'
                          );
                        }}>
                        {icon}
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          marginTop: '4%',
                        }}>
                        Upload Image 2
                      </Text>
                      <TouchableOpacity
                        style={{ marginHorizontal: 20, marginTop: '3.5%' }}
                        onPress={() => {
                          this.selectImage(
                            'image2/' + this.state.name + Math.random(),
                            '2'
                          );
                        }}>
                        {icon2}
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.contact.length < 10) {
                          Alert.alert(
                            'Invalid!',
                            'Please Enter a Valid Contact No.'
                          );
                        } else {
                          this.addUserProducts();
                          this.getProducts();
                          this.showRewardedAndroid();
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
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </ScrollView>
        </View>
      );
    }
  }
}
