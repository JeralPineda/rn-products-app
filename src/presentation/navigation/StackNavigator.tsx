// /* eslint-disable react/no-unstable-nested-components */
import React from "react";
import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from "@react-navigation/stack";
import {LoadingScreen} from "../screens/loading/LoadingScreen";
import {LoginScreen} from "../screens/auth/LoginScreen";
import {RegisterScreen} from "../screens/auth/RegisterScreen";
import {HomeScreen} from "../screens/home/HomeScreen";
import {ProductScreen} from "../screens/product/ProductScreen";
import {useTheme} from "@ui-kitten/components";

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerTintColor: theme["color-primary-500"],
        // cardStyleInterpolator: fadeAnimation,
      }}>
      <Stack.Screen
        options={{
          title: "",
          cardStyleInterpolator: fadeAnimation,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: " ",
          cardStyleInterpolator: fadeAnimation,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
