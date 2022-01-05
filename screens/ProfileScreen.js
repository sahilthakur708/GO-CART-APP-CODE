import React  from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AdMobRewarded } from 'expo-ads-admob';

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      city: '',
      contact: '',
      country: '',
      pincode: '',
      id: '',
      image:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      uploading: 'none',
      email: firebase.auth().currentUser.email,
    };
  }
  showRewardedAndroid = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-2287594817055137/8373684623');
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };
  getProfile = async () => {
    var temp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();
    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        city: obj.city,
        contact: obj.contact,
        country: obj.country,
        pincode: obj.pincode,
        image: obj.image,
        name: obj.name,
        address: obj.address,
        id: doc.id,
      });
    });
  };

  onSubmit = () => {
    db.collection('users').doc(this.state.id).update({
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      contact: this.state.contact,
      country: this.state.country,
      pincode: this.state.pincode,
      image: this.state.image,
    });
    Alert.alert('submitted');
  };

  selectImage = async (path, number) => {
    this.setState({ uploading: true });

    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ uploading: false, image: url });
      })
      .catch((error) => {
        this.setState({ uploading: 'none', image: '#' });
      });
  };

  componentDidMount = () => {
    this.getProfile();
  };

  render() {
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
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          <View>
            <Image
              source={{ uri: this.state.image }}
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center',
                borderRadius: 120,
                marginBottom: 10,
                marginTop: '5%',
              }}
            />
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                alignSelf: 'center',
              }}
              onPress={() => {
                this.selectImage('profile/');
              }}>
              {icon}
            </TouchableOpacity>
          </View>

          <TextInput
            style={{
              backgroundColor: '#EAEAEA',
              width: '80%',
              alignSelf: 'center',
              marginTop: '5%',
              height: 35,
              borderRadius: 10,
              paddingLeft: 20,
            }}
            placeholder={'Name'}
            maxLength={16}
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
          />

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
            placeholder={'email'}
            value={this.state.email}
          />

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
            placeholder={'address'}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />
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
            placeholder={'city'}
            value={this.state.city}
            onChangeText={(text) => {
              this.setState({
                city: text,
              });
            }}
          />
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
            placeholder={'country'}
            value={this.state.country}
            onChangeText={(text) => {
              this.setState({
                country: text,
              });
            }}
          />
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
            placeholder={'pincode'}
            value={this.state.pincode}
            onChangeText={(text) => {
              this.setState({
                pincode: text,
              });
            }}
          />
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
            placeholder={'contact'}
            value={this.state.contact}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
          />

          <TouchableOpacity
            onPress={() => {
              this.onSubmit();
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
              marginBottom: '6%',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 22,
                justifyContent: 'center',
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
