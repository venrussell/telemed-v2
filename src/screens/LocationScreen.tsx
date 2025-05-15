import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

// Define the Location type
interface Location {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  link?: string; // link is optional
}

const hospitals: Location[] = [
  { id: 1, latitude: 14.5777811, longitude: 120.9856047, title: "Philippine General Hospital", link: "https://www.google.com/maps/place/Philippine+General+Hospital/@14.5777863,120.9830298,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ca286853b849:0x26b215aedae35687!8m2!3d14.5777811!4d120.9856047!16zL20vMDFiZGhz?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 2, latitude: 14.6342467, longitude: 121.0228414, title: "Capitol Medical Center", link: "https://maps.app.goo.gl/V18T6emAzcPUptuHA" },
  { id: 3, latitude: 14.719285, longitude: 121.0390189, title: "Hope General Hospital", link: "https://www.google.com/maps/place/Hope+General+Hospital/@14.7192902,121.036444,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b0fc79db354f:0xdebf68cf22c1d074!8m2!3d14.719285!4d121.0390189!16s%2Fg%2F1th21bgz?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 4, latitude: 14.7056037, longitude: 121.0719949, title: "Fairview General Hospital", link: "https://maps.app.goo.gl/QsyGkQVCXq9pWivc7" },
  { id: 5, latitude: 14.6898788, longitude: 120.978154, title: "Valenzuela Medical Center", link: "https://www.google.com/maps/place/Valenzuela+Medical+Center/@14.689884,120.9755791,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b406693a4bdb:0xf13a86f69a9a3fe7!8m2!3d14.6898788!4d120.978154!16s%2Fm%2F0jt36sd?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 6, latitude: 14.5721964, longitude: 121.0994306, title: "Pasig City General Hospital", link: "https://www.google.com/maps/place/Pasig+City+General+Hospital/@14.5722015,121.0945597,17z/data=!3m1!4b1!4m6!3m5!1s0x3397c7c1d4f56bad:0x4ea2528d7a5c930b!8m2!3d14.5721964!4d121.0994306!16s%2Fg%2F1td02l1f?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 7, latitude: 14.6107432, longitude: 120.9902641, title: "University of Santo Tomas Hospital", link: "https://maps.app.goo.gl/be7p4jVuH75Gc4ra9" },
  { id: 8, latitude: 14.7563848, longitude: 121.0502375, title: "Caloocan City North Medical Center", link: "https://www.google.com/maps/place/Caloocan+City+North+Medical+center/@14.75639,121.0476626,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b024b0283067:0xfcf76726af541d33!8m2!3d14.7563848!4d121.0502375!16s%2Fg%2F11c6cjbj52?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 9, latitude: 14.766024, longitude: 121.0847039, title: "North Caloocan Doctors Hospital", link: "https://www.google.com/maps/place/North+Caloocan+Doctors+Hospital/@14.7660292,121.082129,17z/data=!3m1!4b1!4m6!3m5!1s0x3397a55438e41c59:0x4007f9e9b70d1fab!8m2!3d14.766024!4d121.0847039!16s%2Fg%2F1hc27lvj4?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 10, latitude: 14.6641226, longitude: 121.0667406, title: "New Era General Hospital", link: "https://www.google.com/maps/place/New+Era+General+Hospital/@14.6641278,121.0641657,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b743408557a7:0x34a39dd1730555d3!8m2!3d14.6641226!4d121.0667406!16s%2Fg%2F1tqtvdy8?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 11, latitude: 14.6348716, longitude: 120.9630926, title: "Tondo Medical Center", link: "htthttps://www.google.com/maps/place/Tondo+Medical+Center/@14.6348768,120.9605177,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b5bfc28adbb1:0x118717535f0d3955!8m2!3d14.6348716!4d120.9630926!16s%2Fm%2F03cgnns?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3Dps://maps.app.goo.gl/DBXSCkyEiXKPk1hy5" },
  { id: 12, latitude: 14.763251, longitude: 121.04412, title: "Nodado General Hospital", link: "https://www.google.com/maps/place/Nodado+General+Hospital/@14.7632562,121.0415451,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b02897c85fef:0x8ac3f59f90bcb1c6!8m2!3d14.763251!4d121.04412!16s%2Fg%2F11b8_v3c58?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 13, latitude: 14.6261537, longitude: 120.9878946, title: "Chinese General Hospital and Medical Center", link: "https://www.google.com/maps/place/Chinese+General+Hospital+Colleges/@14.6270035,120.9863677,17z/data=!4m6!3m5!1s0x3397b60a08e9bf71:0x4386531cdd742a05!8m2!3d14.625192!4d120.988138!16zL20vMGZra3Fi?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 14, latitude: 14.609289, longitude: 120.977956, title: "Metropolitan Medical Center", link: "https://maps.app.goo.gl/NvxtvhGK9eMdLfcs8" },
  { id: 15, latitude: 14.627676, longitude: 121.034620, title: "Dr. Jesus C. Delgado Memorial Hospital", link: "https://maps.app.goo.gl/98F9L75tSfj9FfKRA" },
  { id: 16, latitude: 14.613523, longitude: 120.980694, title: "San Lazaro Hospital", link: "https://maps.app.goo.gl/3dVbN9E3bx5f6A7L8" },
  { id: 17, latitude: 14.614329, longitude: 120.981594, title: "Jose R. Reyes Memorial Medical Center", link: "https://maps.app.goo.gl/374hwGTfUobV6NjN6" },
  { id: 18, latitude: 14.603274, longitude: 120.987186, title: "Mary Chiles General Hospital", link: "https://maps.app.goo.gl/3yWJJHHXVKzgHhTq6" },
  { id: 19, latitude: 14.622538, longitude: 121.020670, title: "St. Luke's Medical Center Quezon City", link: "https://maps.app.goo.gl/Sw5dJjtzE43DtUb69" },
  { id: 20, latitude: 14.6201192, longitude: 121.0174264, title: "De Los Santos Medical Center", link: "https://maps.app.goo.gl/1Bcd7PZLvh2Fi8rR6" },
];


const clinics: Location[] = [
  { id: 1, latitude: 14.676041, longitude: 121.043700, title: "Clinic 1" },
  { id: 2, latitude: 14.6546, longitude: 121.0326, title: "Caduceus Medical Multispecialty Clinic", link: "https://www.google.com/maps/place/Caduceus+Medica+Multispecialty+Clinic/" },
  { id: 3, latitude: 14.6545, longitude: 121.0325, title: "Del Mundo Pediatric and Adult Eye Clinic", link: "https://www.google.com/maps/place/Del+Mundo+Pediatric+and+Adult+Eye+Clinic+-+Trinoma/" },
  { id: 4, latitude: 14.6488, longitude: 121.0509, title: "J. Cruz HealthCheck Medical Services", link: "https://www.google.com/maps/place/J.+Cruz+Healthcheck+Medical+Services/" },
  { id: 5, latitude: 14.6898, longitude: 121.0950, title: "Odecor-B Medical Clinic", link: "https://www.google.com/maps/place/Odecor-B+Clinic/" },
  { id: 6, latitude: 14.6215, longitude: 121.0211, title: "Diagnostica De San Vicente Health Care Center", link: "https://www.google.com/maps/place/Diagnostica+de+San+Vicente/" },
  { id: 7, latitude: 14.6412, longitude: 121.0318, title: "Dr. Jemaila Valles - Doc Jem Pediatrician Clinic", link: "https://www.google.com/maps/place/Dr.+JEMAILA+VALLES+-+Pediatrician/" },
  { id: 8, latitude: 14.6130, longitude: 121.0492, title: "Five One Five Drug Testing Center", link: "https://www.google.com/maps/place/Five+One+Five+Drug+Testing+Center/" },
  { id: 9, latitude: 14.6237, longitude: 120.9975, title: "Ambucore Ambulance Services", link: "https://www.google.com/maps/place/Ambucore+Ambulance+Services/" },
  { id: 10, latitude: 14.5923, longitude: 121.0575, title: "Dermalosophy Clinic", link: "https://www.google.com/maps/place/Dermalosophy+Clinic/" },
  { id: 11, latitude: 14.7298, longitude: 121.0673, title: "Lagro Ob-Gyn Ultrasound Clinic", link: "https://www.google.com/maps/place/Lagro+Ob-Gyn+Ultrasound+Clinic/" },
  { id: 12, latitude: 14.6425, longitude: 121.0514, title: "Urology Center of the Philippines", link: "https://www.google.com/maps/place/Urology+Center+of+the+Philippines/" },
  { id: 13, latitude: 14.7368, longitude: 121.0600, title: "QualiMed Surgery Center", link: "https://www.google.com/maps/place/QualiMed+Surgery+Center/" },
  { id: 14, latitude: 14.6447, longitude: 121.0520, title: "Best Diagnostic Corp", link: "https://www.google.com/maps/place/Best+Diagnostic+Corp/" },
  { id: 15, latitude: 14.7352, longitude: 121.0660, title: "Neopolitan Hospital", link: "https://www.google.com/maps/place/Neopolitan+General+Hospital/" },
  { id: 16, latitude: 14.7356, longitude: 121.0670, title: "San Lorenzo Emergency & Maternity Clinic", link: "https://www.google.com/maps/place/San+Lorenzo+Emergency+%26+Maternity+Clinic/" }
];


const LocationScreen = () => {
  const [selectedType, setSelectedType] = useState<"Hospital" | "Clinic">("Hospital");
  const [region, setRegion] = useState({
    latitude: 14.676041,
    longitude: 121.043700,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const toggleMarkers = () => {
    setSelectedType((prev) => (prev === "Hospital" ? "Clinic" : "Hospital"));
  };

  const handleDoubleClick = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const handleProceed = () => {
    if (selectedLocation?.link) {
      Linking.openURL(selectedLocation.link);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView key={selectedType} style={styles.map} region={region}>
        {(selectedType === "Clinic" ? clinics : hospitals).map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            onPress={() => handleDoubleClick(location)} // Only show modal on marker press
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={toggleMarkers}>
        <Text style={styles.buttonText}>
          {selectedType === "Hospital" ? "Show Clinics" : "Show Hospitals"}
        </Text>
      </TouchableOpacity>

      <Modal
  transparent={true}
  animationType="slide"
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {selectedLocation && (
        <Text style={styles.modalText}>
          {selectedLocation.title} {/* Display hospital/clinic name */}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#4B3F96",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#4B3F96",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});