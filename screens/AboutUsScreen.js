import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default class AboutUs extends React.Component {
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
                marginTop: '8%',
              }}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Entypo name="list" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: '10%',
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
                marginTop: '12%',
                paddingBottom: 15,
              }}>
              About Us
            </Text>
          </View>
        </LinearGradient>
        <Image
          source={require('../Images/AboutUs.png')}
          style={{
            width: '105%',
            height: 250,
            alignSelf: 'center',
          }}
        />
        <ScrollView>
          <View
            style={{
              marginLeft: '45%',
              width: 200,
              fontWeight: 'bold',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                width: 200,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Our Vision
            </Text>
            <Text
              style={{
                width: 200,
                fontSize: 15,
              }}>
              Our Vision is to provide our users an opportunity to rent their
              household items which they do not use often.
            </Text>
          </View>
          <View
            style={{
              marginLeft: '5%',
              width: 200,
              fontWeight: 'bold',
              flexDirection: 'column',
              marginTop: '5%',
            }}>
            <Text
              style={{
                width: 200,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Our Mission
            </Text>
            <Text
              style={{
                width: 200,
                fontSize: 15,
              }}>
              Our Mission is to provide the costly resource's to the people who
              can't afford them and want only for some time.This can be done by
              renting, which our app provides.We want our users to rent their
              products which they do not use often. By which those people who
              can not afford the costly products and want only for some time
              they will get that product from our app.
            </Text>
          </View>
          <View
            style={{
              marginLeft: '40%',
              width: 200,
              fontWeight: 'bold',
              flexDirection: 'column',
              marginTop: '5%',
            }}>
            <Text
              style={{
                width: 200,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Users Advantage
            </Text>
            <Text
              style={{
                width: 200,
                fontSize: 15,
              }}>
              We all know that users will use our app for advantage and our app
              provide them lot of advantages.The one of those advantages are
              that the people can rent their products and get money by renting
              and they can get their product back after renting and rent that
              product again another advantage is that you will get 100% of cash
              amount from your rented products no amount will be taken by our
              app.
            </Text>
          </View>
          <View style={{ alignSelf: 'center', marginTop: '5%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Need any help? Reach out to me by my Email.
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: '#F26A68',
                marginTop: '5%',
                width: 100,
                height: 40,
                alignSelf: 'center',
                borderRadius: 14,
                alignItems: 'center',
                marginBottom: '10%',
              }}
              onPress={() =>
                Linking.openURL('mailTo:' + 'sahilthakurgocart@gmail.com')
              }>
              <MaterialIcons name="email" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
