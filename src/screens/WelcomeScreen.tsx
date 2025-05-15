import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// import { WelcomeScreenNavigationProp } from "../navigation/types"; // Temporarily removed to test

const WelcomeScreen = () => {
  const navigation = useNavigation<any>(); // Temporary fix for navigation types

  return (
    <View style={styles.container}>
      {/* Background Circles */}
      <View style={styles.circleLarge}>
        <Text style={{ opacity: 0 }}>•</Text> {/* Prevent empty View errors */}
      </View>
      <View style={styles.circleSmall}>
        <Text style={{ opacity: 0 }}>•</Text> {/* Prevent empty View errors */}
      </View>

      {/* Image and Welcome Message */}
      <Image source={require("../../assets/wcs.jpg")} style={styles.image} />
      <Text style={styles.title}>Welcome to TeleMed</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#6C63FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // Large Darker Circle (Bottom Layer)
  circleLarge: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 250,
    height: 250,
    backgroundColor: "#6A6D96",
    borderRadius: 125,
    opacity: 0.8, // Added opacity to prevent rendering issues
  },
  // Slightly Bigger Purple Circle (Top Layer)
  circleSmall: {
    position: "absolute",
    top: -110,
    left: 40,
    width: 200,
    height: 200,
    backgroundColor: "#5951B3",
    borderRadius: 100,
    opacity: 0.8, // Added opacity to prevent rendering issues
  },
});
