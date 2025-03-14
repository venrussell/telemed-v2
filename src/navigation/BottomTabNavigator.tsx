import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import PhoneScreen from "../screens/ContactScreen"; 
import ChatbotScreen from "../screens/ChatbotScreen";
import AccountScreen from "../screens/AccountScreen";
import LocationScreen from "../screens/LocationScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: string = "help-circle"; // Default icon

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Location") {
          iconName = "location-sharp";
        } else if (route.name === "Contacts") {
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
      <Tab.Screen name="Contacts" component={PhoneScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Account" component={AccountScreen} /> 
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
