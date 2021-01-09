import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ExchangeScreen from '../screens/exchangeScreen';
import HomeScreen from '../screens/homeScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: {
      tabBarIcon: <Image source={require('../assets/request-list.png')} style={{width: 30, height: 30, marginBottom: -5}}/>,
      tabBarLabel: 'Home'
    } },
    Exchange: { screen: ExchangeScreen, navigationOptions: {
      tabBarIcon: <Image source={require('../assets/request-book.png')} style={{width: 33, height: 33, marginBottom: -5}}/>,
      tabBarLabel: 'Exchange Items'
    } },
  },
);