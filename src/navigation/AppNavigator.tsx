import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegisterSuccess from "../screens/RegisterSuccess";
import BottomTabNavigator from "./BottomTabNavigator"; // Import BottomTabNavigator
import { RootStackParamList } from "./types";
<<<<<<< HEAD
<<<<<<< HEAD
import ImageDetection from "../screens/ImageDetection"; //  Import ImageDetection
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
<<<<<<< HEAD
<<<<<<< HEAD
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="ImageDetection" component={ImageDetection} />
=======
      <Stack.Screen name="Home" component={BottomTabNavigator} /> 
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
=======
      <Stack.Screen name="Home" component={BottomTabNavigator} /> 
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
    </Stack.Navigator>
  );
};

export default AppNavigator;
