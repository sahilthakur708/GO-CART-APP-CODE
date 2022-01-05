import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AboutUsScreen from '../screens/AboutUsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CategoryDetailsScreen from '../screens/CategoryScreenDetails';
import HomeScreen from '../screens/HomeScreen';
import InterestRecievedForProductsScreen from '../screens/InterestReceivedForProductsScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductsUploadingScreen from '../screens/ProductsUploadingFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoadingScreen from '../screens/LoadingScreen';
import InteresSentForProducts from '../screens/InterestSentForProducts';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import EditProductScreen from '../screens/EditProductScreen';

const Stack1 = createStackNavigator();

const CategoryStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="HomeScreen" component={HomeScreen} />
      <Stack1.Screen
        options={{
          title: 'Explore Products',
        }}
        name="CategoryScreen"
        component={CategoryScreen}
      />
      <Stack1.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
        options={{ headerShown: false, title: 'Product Details' }}
      />
    </Stack1.Navigator>
  );
};

const Stack2 = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack2.Navigator screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack2.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: true, title: 'Edit Profile' }}
      />
    </Stack2.Navigator>
  );
};

const Stack3 = createStackNavigator();

const ProductsStack = () => {
  return (
    <Stack3.Navigator screenOptions={{ headerShown: false }}>
      <Stack3.Screen
        name="ProductsUploadingScreen"
        component={ProductsUploadingScreen}
      />
      <Stack3.Screen
        options={{
          title: 'Edit Products',
        }}
        name="EditProductsScreen"
        component={EditProductScreen}
      />
    </Stack3.Navigator>
  );
};
const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
      initialRouteName="InterestRecievedForProductsScreen"
      activeColor="white"
      inactiveColor="black"
      labeled={true}
      barStyle={{ backgroundColor: '#F36161' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'InterestRecievedForProductsScreen') {
            return (
              <MaterialIcons name="call-received" size={20} color={color} />
            );
          } else if (route.name === 'InterestSentForProducts') {
            return (
              <MaterialIcons name="present-to-all" size={20} color={color} />
            );
          }
        },
      })}>
      <Tab.Screen
        name="InterestRecievedForProductsScreen"
        component={InterestRecievedForProductsScreen}
        options={{
          title: 'Interests Recieved For Products',
        }}
      />

      <Tab.Screen
        name="InterestSentForProducts"
        component={InteresSentForProducts}
        options={{ title: 'Interest Sent For Products' }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerContent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={CategoryStack}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen
        name="ProductsUploadingScreen"
        component={ProductsStack}
        options={{ headerShown: false, title: 'Upload Your Products' }}
      />
      <Drawer.Screen
        name="InterestRecievedForProductsScreen"
        component={TabContent}
        options={{
          title: 'Interests Received/Sent For Products',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        options={{ title: 'Settings', headerShown: false }}
        name="SettingsScreen"
        component={SettingsStack}
      />
      <Drawer.Screen
        options={{ title: 'About Us', headerShown: false }}
        name="AboutUsScreen"
        component={AboutUsScreen}
      />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={DrawerContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
