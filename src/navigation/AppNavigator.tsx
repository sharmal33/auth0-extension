import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from './routes';

import NavigationService from './NavigationService';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PhoneAuth from '@/screens/PhoneAuth/PhoneAuth';
import Dashboard from '@/screens/Dashboard/Dashboard';
import LoginFailed from '@/screens/LoginFailed/LoginFailed';

const Stack = createStackNavigator();

export const defaultBackButton = (): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backIcon}
      onPress={() => {
        NavigationService.goBack();
      }}
    >
      <Ionicons name='arrow-back' size={24} color={color.brand.primary} />
    </TouchableOpacity>
  );
};

/**
 * AppNavigator component for managing navigation.
 * @returns {JSX.Element} - The AppNavigator component.
 */
const AppNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Route.PHONE_AUTH}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerLeft: () => defaultBackButton(),
        headerTitle: '',
        presentation: 'modal',
        header: () => null,
      }}
    >
      <Stack.Screen
        name={Route.PHONE_AUTH}
        component={PhoneAuth}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.DASHBOARD}
        component={Dashboard}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.LOGIN_FAILED}
        component={LoginFailed}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    paddingHorizontal: 24,
  },
});

export default AppNavigator;
