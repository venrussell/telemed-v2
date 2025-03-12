import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Account Page (Registration & Credentials)</Text>
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

export default AccountScreen;
