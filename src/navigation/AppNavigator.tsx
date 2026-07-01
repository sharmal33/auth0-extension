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

import Method from '@/screens/Method/Method';
import PhoneNativeLogin from '@/screens/PhoneNativeLogin/PhoneNativeLogin';
import PhoneNativeRegister from '@/screens/PhoneNativeRegister/PhoneNativeRegister';
import Phone from '@/screens/Phone/Phone';
import Dashboard from '@/screens/Dashboard/Dashboard';

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
      initialRouteName={Route.METHOD}
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
        name={Route.METHOD}
        component={Method}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.PHONE_NATIVE_LOGIN}
        component={PhoneNativeLogin}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.PHONE_NATIVE_REGISTER}
        component={PhoneNativeRegister}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.PHONE}
        component={Phone}
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    paddingHorizontal: 24,
  },
});

export default AppNavigator;
