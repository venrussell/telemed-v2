import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EmergencyContact = {
  id: string;
  name: string;
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const emergencyContacts: EmergencyContact[] = [
  { id: "1", name: "Police", number: "911", icon: "call" },
  { id: "2", name: "Fire Department", number: "911", icon: "flame" },
  { id: "3", name: "Ambulance", number: "911", icon: "medkit" },
  { id: "4", name: "Red Cross", number: "143", icon: "heart" },
  { id: "5", name: "National Disaster Hotline", number: "117", icon: "warning" },
];

const ContactScreen = () => {
  const dialNumber = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Hotlines</Text>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => dialNumber(item.number)}>
            <Ionicons name={item.icon} size={24} color="#5B53AC" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.number}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#727A9C",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFFFF",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#5B53AC",
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5B53AC",
  },
});

export default ContactScreen;
