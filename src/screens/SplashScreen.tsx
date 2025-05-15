import React, { useEffect, useRef } from "react";
import { 
  View, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  Pressable, 
  Animated 
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      {/* Pressable Logo with Scale Effect */}
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logospl.png")}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        />
      </Pressable>
      
      {/* Loading Indicator */}
      <ActivityIndicator size="large" color="#6C63FF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 400,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20, 
  },
  loader: {
    marginTop: 10, 
  },
});
