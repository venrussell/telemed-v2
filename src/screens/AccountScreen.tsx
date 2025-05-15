import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    medicalhistory: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const existingUsers = await AsyncStorage.getItem("users");
        if (existingUsers) {
          const users = JSON.parse(existingUsers);
          setUser(users[users.length - 1]); // Get the latest registered user
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.circleLarge}></View>
        <View style={styles.circleSmall}></View>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require("../../assets/log.jpg")} style={styles.profileImage} />
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={styles.infoContainer}>
         <Text style={styles.label}>Username: </Text>
          <Text style={styles.profileText}>{user.username}</Text>
        </View>
        <View style={styles.infoContainer}>
        <Text style={styles.label}>Fullname: </Text>
          <Text style={styles.profileText}>{user.fullname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email Address: </Text>
          <Text style={styles.profileText}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
        <Text style={styles.label}>Medical History: </Text>
          <Text style={styles.profileText}>{user.medicalhistory}</Text>
        </View>
        <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number: </Text>
          <Text style={styles.profileText}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  circleLarge: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 180,
    height: 180,
    backgroundColor: "#6A6D96",
    borderRadius: 90,
  },
  circleSmall: {
    position: "absolute",
    top: -70,
    left: 60,
    width: 140,
    height: 140,
    backgroundColor: "#5951B3",
    borderRadius: 70,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileText: {
    fontSize: 20,
    color: "#333",
  },
});

export default AccountScreen;