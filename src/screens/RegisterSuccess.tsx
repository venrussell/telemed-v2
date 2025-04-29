import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const RegisterSuccess = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.headerCircles}></View>
      <Text style={styles.title}>Registration Success</Text>
      <Image source={require("../../assets/check.png")} style={styles.successIcon} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Proceed</Text>
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
    padding: 20,
  },
  headerCircles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: "#6653e0",
    borderBottomRightRadius: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  successIcon: {
    width: 80,
    height: 80,
    tintColor: "#6653e0",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#6653e0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterSuccess;
