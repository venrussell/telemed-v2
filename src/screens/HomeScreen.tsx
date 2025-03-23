import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const healthData = {
  heartRate: 96,
  bloodType: "B+",
  weight: 80,
  weightCategory: "Healthy",
};

// Sample reports (titles only)
const reports = [
  { id: "1", title: "General Health" },
  { id: "2", title: "Diabetes" },
];

// External links
const LINKS = {
  heartRate: "https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates",
  bloodType: "https://www.redcrossblood.org/donate-blood/blood-types.html",
  weight: "https://www.cdc.gov/healthyweight/index.html",
  generalHealth: [
    { title: "CDC General Health", url: "https://www.cdc.gov/healthyliving/" },
    { title: "WHO Health Topics", url: "https://www.who.int/health-topics" },
    { title: "Mayo Clinic Health Information", url: "https://www.mayoclinic.org/patient-care-and-health-information" },
  ],
  diabetes: [
    { title: "American Diabetes Association", url: "https://www.diabetes.org/" },
    { title: "CDC Diabetes Information", url: "https://www.cdc.gov/diabetes/" },
    { title: "Mayo Clinic Diabetes Care", url: "https://www.mayoclinic.org/diseases-conditions/diabetes" },
  ],
};

const openLink = (url: string) => {
  Linking.openURL(url).catch((err) => console.error("Failed to open link:", err));
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");

  const openModal = (title: string) => {
    setSelectedReport(title);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Hello, User!</Text>
      </View>

      {/* Health Overview */}
      <View style={styles.healthContainer}>
        <TouchableOpacity style={[styles.healthCard, styles.heartRate]} onPress={() => openLink(LINKS.heartRate)}>
          <Text style={styles.cardTitle}>Heart Rate</Text>
          <Text style={styles.heartRate}>{healthData.heartRate} bpm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.healthCard, styles.bloodType]} onPress={() => openLink(LINKS.bloodType)}>
          <Text style={styles.cardTitle}>Blood Group</Text>
          <Text style={styles.cardValue}>{healthData.bloodType}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.healthCard, styles.weightCard]} onPress={() => openLink(LINKS.weight)}>
          <Text style={styles.cardTitle}>Weight</Text>
          <Text style={styles.cardValue}>{healthData.weight} Kg</Text>
          <Text style={styles.weightCategory}>{healthData.weightCategory}</Text>
        </TouchableOpacity>
      </View>

      {/* Latest Reports */}
      <Text style={styles.sectionTitle}>Latest Report</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reportCard} onPress={() => openModal(item.title)}>
            <Ionicons name="folder" size={24} color="#5B53AC" />
            <View style={styles.reportTextContainer}>
              <Text style={styles.reportTitle}>{item.title}</Text>
            </View>
            <Ionicons name="ellipsis-vertical" size={20} color="#5B53AC" />
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedReport}</Text>
            {selectedReport === "General Health" ? (
              LINKS.generalHealth.map((link, index) => (
                <View key={index} style={styles.linkContainer}>
                  <Text style={styles.bullet}>•</Text>
                  <TouchableOpacity onPress={() => openLink(link.url)}>
                    <Text style={styles.modalLink}>{link.title}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : selectedReport === "Diabetes" ? (
              LINKS.diabetes.map((link, index) => (
                <View key={index} style={styles.linkContainer}>
                  <Text style={styles.bullet}>•</Text>
                  <TouchableOpacity onPress={() => openLink(link.url)}>
                    <Text style={styles.modalLink}>{link.title}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.modalText}>Details about {selectedReport} will be displayed here.</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#5B53AC",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 18,
    color: "#DDDDDD",
  },
  healthContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  healthCard: {
    width: "48%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  heartRate: {
    backgroundColor: "#74C0FC",
  },
  bloodType: {
    backgroundColor: "#F87171",
  },
  weightCard: {
    backgroundColor: "#A3E635",
  },
  modalLink: {
    fontSize: 16,
    color: "#007BFF",
    marginVertical: 5,
    textDecorationLine: "none", // No underline
    textAlign: "left", // Align text to the left
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align bullet and text to the left
  },
  bullet: {
    fontSize: 16,
    color: "black", // Black color for the bullet
    marginRight: 8, // Space between bullet and text
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "flex-start", // Align content to the left
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: "#5B53AC", // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center the text inside the button
    width: '100%', // Make button full width
    marginTop: 10, // Add margin on top to separate from other content
  },
  closeButtonText: {
    color: "#FFFFFF", // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardValue: {
    fontSize: 16,
    color: "#555",
  },
  weightCategory: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reportTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

export default HomeScreen;