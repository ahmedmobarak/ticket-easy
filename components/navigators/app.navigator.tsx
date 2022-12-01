// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './tab.navigator';
import LoginComponent from '../auth/login';
import { SignupComponent } from '../auth/signup';
import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from '../../helpers/appRoutes';
import CheckoutComponent from '../stack/checkout';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AppRoutes.login}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Signup" component={SignupComponent} />
        <Stack.Screen name="Checkout" component={CheckoutComponent}></Stack.Screen>
        <Stack.Screen name="Tab" component={TabNav} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

export default AppNavigator;