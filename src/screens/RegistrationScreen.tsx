import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;
type User = {
    username: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
  };
  
const RegistrationScreen = () => {
  const navigation = useNavigation<RegistrationScreenNavigationProp>();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalhi, setMedicalHistory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleRegister = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem("users");
      let users: User[] = existingUsers ? JSON.parse(existingUsers) : [];
  
      const newUser: User = { username, fullname, email, phone, password };
  
      const userExists = users.some((user: User) => user.username === username || user.email === email);
      if (userExists) {
        Alert.alert("Error", "User already exists. Try logging in.");
        return;
      }
  
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("RegisterSuccess");
    } catch (error) {
      Alert.alert("Error", "Failed to register.");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.circleLarge}></View>
      <View style={styles.circleSmall}></View>
      <Text style={styles.title}>Registration</Text>

      <TextInput style={styles.input} placeholder="Enter Username" placeholderTextColor="white" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Enter Fullname" placeholderTextColor="white" value={fullname} onChangeText={setFullname} />
      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="white" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Enter Medical History" placeholderTextColor="white" value={username} onChangeText={setMedicalHistory} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="white" value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Re-Enter Your Password" secureTextEntry placeholderTextColor="white" value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footerText}>Already have an account? Login</Text>
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
  circleLarge: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 250,
    height: 250,
    backgroundColor: "#6A6D96",
    borderRadius: 125,
  },
  circleSmall: {
    position: "absolute",
    top: -110,
    left: 40,
    width: 200,
    height: 200,
    backgroundColor: "#5951B3",
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#6653e0",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6653e0",
    padding: 12,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    color: "#6653e0",
    marginTop: 10,
  },
});

export default RegistrationScreen;
