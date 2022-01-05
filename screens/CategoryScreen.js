import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.route.params.category,
      products: [],
    };
  }
  showInterstitialAndroid = async () => {
    await AdMobInterstitial.setAdUnitID(
      'ca-app-pub-2287594817055137/3157016962'
    );
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };
  getProducts = async () => {
    var category = this.props.route.params.category;
    this.setState({ products: [] });
    var resp = await db
      .collection('products')
      .where('category', '==', this.state.category)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.products;
      var doc = d.data();
      doc.id = d.id;
      temp.push(doc);
      this.setState({ products: temp });
    });
  };
  componentDidMount = async () => {
    this.getProducts();
    this.showInterstitialAndroid();
  };
  render() {
    if (this.state.products.length === 0) {
      return (
        <View>
          <LinearGradient colors={['#AD89DE', '#F36161']}>
            <TouchableOpacity
              style={{
                height: 50,
                flexDirection: 'row',
                paddingTop: '2%',
                paddingRight: '5%',
                marginTop: '7%',
                marginBottom: '5%',
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
                Explore Products
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={{ alignSelf: 'center', marginTop: '50%' }}>
            Products in this category will appear here!!
          </Text>
          <AdMobBanner
              style={{ alignSelf: 'center', marginBottom: '2%' }}
              bannerSize="full"
              adUnitID="ca-app-pub-2287594817055137/2403404156"
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdViewDidReceiveAd={this.bannerAdReceived}
            />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <LinearGradient colors={['#AD89DE', '#F36161']}>
            <TouchableOpacity
              style={{
                height: 50,
                flexDirection: 'row',
                paddingTop: '2%',
                paddingRight: '5%',
                marginTop: '7%',
                marginBottom: '5%',
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
                Explore Products
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView>
            <View
              style={{
                flex: 1,
                width: '92%',
                alignSelf: 'center',
              }}>
              {this.state.products.map((d) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('CategoryDetailsScreen', {
                        productId: d.id,
                      });
                    }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 20,
                      marginTop: 20,
                      width: '95%',
                      alignSelf: 'center',
                      shadowColor: 'black',
                      shadowOffset: {
                        width: 2,
                        height: 15,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 18.32,
                      elevation: 16,
                      marginBottom: '2%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        padding: 5,
                      }}>
                      <Image
                        source={{ uri: d.image1 }}
                        style={{
                          width: '45%',
                          height: 150,
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          borderRadius: 10,
                          width: '55%',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: '60%',
                            marginLeft: '5%',
                          }}>
                          {d.name}
                        </Text>
                        <Text
                          style={{
                            marginTop: '2%',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginLeft: '5%',
                            color: '#F15F5E',
                          }}>
                          ₹{d.cost} /day
                        </Text>
                        <Text style={{ marginLeft: '5%', marginTop: '2%' }}>
                          {d.status}
                        </Text>
                        <Text
                          style={{
                            marginTop: '2%',
                            marginLeft: '5%',
                            width: '60%',
                          }}
                          numberOfLines={1}>
                          {d.discription}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 14,
                            marginTop: '2%',
                            marginLeft: '5%',
                          }}>
                          {d.verified}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <AdMobBanner
              style={{ alignSelf: 'center', marginBottom: '1%' }}
              bannerSize="full"
              adUnitID="ca-app-pub-2287594817055137/2403404156"
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdViewDidReceiveAd={this.bannerAdReceived}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
