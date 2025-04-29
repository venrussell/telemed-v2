<<<<<<< HEAD
<<<<<<< HEAD
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  RegisterSuccess: undefined;
  Home: undefined;
  ImageDetection: undefined; // Add ImageDetection screen here
};

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome",
  "Login"
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
=======
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  RegisterSuccess: undefined;
  Home: undefined;
};

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome",
  "Login"
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
<<<<<<< HEAD
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
>;