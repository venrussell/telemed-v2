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
  { id: "6", name: "Coast Guard", number: "527-8481", icon: "boat" },
  { id: "7", name: "MMDA Metrobase", number: "136", icon: "alert" },
  { id: "8", name: "Highway Patrol Group", number: "744-4488", icon: "car" },
  { id: "9", name: "NDRRMC (Disaster Response)", number: "911-1406", icon: "earth" },
  { id: "10", name: "PNP Anti-Kidnapping Group", number: "727-0000", icon: "people" },
  { id: "11", name: "PNP Women & Children Protection", number: "523-8231", icon: "woman" },
  { id: "12", name: "Bureau of Fire Protection", number: "426-0219", icon: "flame" },
  { id: "13", name: "Philippine General Hospital", number: "554-8400", icon: "medkit" },
  { id: "14", name: "National Poison Control Center", number: "524-1078", icon: "flask" },
  { id: "15", name: "LTO Hotline", number: "922-9061", icon: "car" },
  { id: "16", name: "DOH COVID-19 Hotline", number: "1555", icon: "medkit" },
  { id: "17", name: "Meralco Emergency", number: "16211", icon: "flash" },
  { id: "18", name: "Manila Water", number: "1627", icon: "water" },
  { id: "19", name: "Maynilad Water", number: "1626", icon: "water" },
  { id: "20", name: "Lifeline Rescue", number: "16911", icon: "medkit" },
];


const ContactScreen = () => {
  const dialNumber = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
  data={emergencyContacts}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false} // Hides the scrollbar
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => dialNumber(item.number)}>
      <Ionicons name={item.icon} size={24} color="white" style={styles.icon} />
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
    backgroundColor: "#FFFFFF", // Light gray background
    padding: 20,
    paddingTop: 50,
  },

  
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#727A9C", // Darker button color
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
    color: "#FFFFFF", // White icon
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF", // White text
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
  },
});


export default ContactScreen;
