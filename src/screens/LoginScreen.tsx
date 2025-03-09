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
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (!storedUsers) {
        Alert.alert("Error", "No user found. Please register.");
        return;
      }
  
      const users: User[] = JSON.parse(storedUsers); 
      const user = users.find((u: User) => (u.username === identifier || u.email === identifier) && u.password === password);
  
      if (user) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(user)); 
        navigation.navigate("Home");
        Alert.alert("Success", "Logged in successfully!");
      } else {
        Alert.alert("Error", "Invalid credentials!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to log in.");
    }
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
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
