import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type User = {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both username/email and password.");
      return;
    }
  
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (!storedUsers) {
        Alert.alert("Error", "No user found. Please register.");
        return;
      }
  
      const users: User[] = JSON.parse(storedUsers);
      const user = users.find(
        (u: User) => (u.username === identifier || u.email === identifier) && u.password === password
      );
  
      if (user) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(user));
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid credentials!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to log in.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Circles */}
      <View style={styles.circleLarge}>
        <Text style={{ opacity: 0 }}>•</Text> {/* Prevent empty View issues */}
      </View>
      <View style={styles.circleSmall}>
        <Text style={{ opacity: 0 }}>•</Text> {/* Prevent empty View issues */}
      </View>

      <Image source={require("../../assets/log.jpg")} style={styles.logo} /> 

      <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="white" value={identifier} onChangeText={setIdentifier} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="white" value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.footerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
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
  },
  // Slightly Bigger Purple Circle (Top Layer)
  circleSmall: {
    position: "absolute",
    top: -110, // Adjusted for better alignment
    left: 40,  // Adjusted for better overlap
    width: 200, // Slightly increased from 180 to 200
    height: 200,
    backgroundColor: "#5951B3",
    borderRadius: 100, // Half of width/height for a perfect circle
  },
  logo: { 
    width: 100, 
    height: 100, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  input: { 
    width: "90%", 
    height: 50, 
    backgroundColor: "#6653e0", 
    borderRadius: 25, 
    marginVertical: 10, 
    paddingLeft: 20, 
    color: "white" },
  button: { 
    width: "90%", 
    height: 50, 
    backgroundColor: "#6653e0", 
    borderRadius: 25, 
    justifyContent: "center", 
    alignItems: "center", 
    marginVertical: 10 
  },
  buttonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  footerText: { 
    color: "#6653e0", 
    marginTop: 10 
  },
});

export default LoginScreen;
