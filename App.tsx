import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator"; 

export default function App() {
  return (
    <NavigationContainer> {/* Keep NavigationContainer here */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppNavigator /> 
      </SafeAreaView>
    </NavigationContainer>
  );
}
