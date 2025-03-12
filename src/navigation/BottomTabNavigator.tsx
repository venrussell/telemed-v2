import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import { View, Text } from "react-native";


const Tab = createBottomTabNavigator();

// Placeholder Screens
const LocationScreen = () => <View><Text>Location Screen</Text></View>;
const PhoneScreen = () => <View><Text>Phone Screen</Text></View>;
const ChatbotScreen = () => <View><Text>Chatbot Screen</Text></View>;
const ContactsScreen = () => <View><Text>Account Screen</Text></View>;

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => {
          let iconName: string = "help-circle"; // Default icon to avoid undefined error
  
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Location") {
            iconName = "location-sharp";
          } else if (route.name === "Phone") {
            iconName = "call";
          } else if (route.name === "Chatbot") {
            iconName = "chatbubble";
          } else if (route.name === "Account") {
            iconName = "person";
          }
  
          return {
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
            tabBarActiveTintColor: "#6653e0",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          };
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Phone" component={PhoneScreen} />
        <Tab.Screen name="Chatbot" component={ChatbotScreen} />
        <Tab.Screen name="Account" component={ContactsScreen} />
      </Tab.Navigator>
    );
  };
  

export default BottomTabNavigator;
