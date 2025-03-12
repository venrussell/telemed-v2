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
});

export default ChatbotScreen;
