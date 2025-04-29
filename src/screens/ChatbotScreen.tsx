<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { RootStackParamList } from "../navigation/types"; // Import the RootStackParamList

const ChatbotScreen = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  // Use correct type for navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const sendDataToPython = async () => {
    try {
      const API_URL = "http://192.168.1.100:5000/analyze"; // Replace with your local IP
      const response = await axios.post(API_URL, { text: inputText });

      setResponseText(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to connect to the server. Check your network.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
      <TextInput
        style={styles.input}
        placeholder={"Enter text"} 
        onChangeText={setInputText}
        value={inputText}
      />
      <Button title="Send to Python" onPress={sendDataToPython} />
      <Text style={styles.responseText}>Response: {responseText}</Text>

      
      <Button title="Go to Image Detection" onPress={() => navigation.navigate("ImageDetection")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  responseText: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
=======
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatbotScreen = () => {
    return (
        <View style={styles.container}>
            <Text>AI Chatbot Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
<<<<<<< HEAD
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
=======
>>>>>>> 13b6366a0e6e603b6d74553981d63b6d094100d9
});

export default ChatbotScreen;
