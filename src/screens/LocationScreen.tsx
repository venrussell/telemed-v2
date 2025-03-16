import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const hospitals = [
  { id: 1, latitude: 14.5777811, longitude: 120.9856047, title: "Philippine General Hospital", link: "https://maps.app.goo.gl/JPvVkLdiEC2hZHMN9" },
  { id: 2, latitude: 14.6342467, longitude: 121.0228414, title: "Capitol Medical Center", link: "https://maps.app.goo.gl/V18T6emAzcPUptuHA" },
  { id: 3, latitude: 14.719285, longitude: 121.0390189, title: "Hope General Hospital", link: "https://maps.app.goo.gl/oMExumTkxno2UYDj9" },
  { id: 4, latitude: 14.5777811, longitude: 120.9856047, title: "Philippine General Hospital", link: "https://maps.app.goo.gl/1e9XEPQQmu4paCLs5" },
  { id: 5, latitude: 14.7056037, longitude: 121.0719949, title: "Fairview General Hospital", link: "https://maps.app.goo.gl/DsYBZVksFzC2W7SV9" },
  { id: 6, latitude: 14.6898788, longitude: 120.978154, title: "Valenzuela Medical Center", link: "https://maps.app.goo.gl/cxDVnnXQjRQWwtoz9" },
  { id: 7, latitude: 14.5721964, longitude: 121.0994306, title: "Pasig City General Hospital", link: "https://maps.app.goo.gl/uAkZ7VniuEWUvZ2W6" },
  { id: 8, latitude: 14.6107432, longitude: 120.9902641, title: "University of Santo Tomas Hospital", link: "https://maps.app.goo.gl/be7p4jVuH75Gc4ra9" },
  { id: 9, latitude: 14.7563848, longitude: 121.0502375, title: "Caloocan City North Medical Center", link: "https://maps.app.goo.gl/cxDVnnXQjRQWwtoz9" },
  { id: 10, latitude: 14.766024, longitude: 121.0847039, title: "North Caloocan Doctors Hospital", link: "https://maps.app.goo.gl/QLBiE7fmWu1EPYir5" },
  { id: 11, latitude: 14.6641226, longitude: 121.0667406, title: "New Era General Hospital", link: "https://maps.app.goo.gl/QsyGkQVCXq9pWivc7" },
  { id: 12, latitude: 14.6348716, longitude: 120.9630926, title: "Tondo Medical Center", link: "https://maps.app.goo.gl/DBXSCkyEiXKPk1hy5" },
  { id: 13, latitude: 14.763251, longitude: 121.04412, title: "Nodado General Hospital", link: "https://maps.app.goo.gl/bwMwgrtot2nThHzy8" },
  { id: 14, latitude: 14.6261537, longitude: 120.9878946, title: "Chinese General Hospital and Medical Center", link: "https://maps.app.goo.gl/1ttxo2HS4gQH2HvM7" },
  { id: 15, latitude: 14.756623424240733, longitude: 121.05028041534506, title: "Hospital 15", link: "https://maps.app.goo.gl/jT98GCNNSX34euPw7" },
  { id: 16, latitude: 14.766179617636103, longitude: 121.08461806930985, title: "Hospital 16", link: "https://maps.app.goo.gl/Q8Gw5FoQovyTYTxD9" },
  { id: 17, latitude: 14.664350945794284, longitude: 121.06672987116372, title: "Hospital 17", link: "https://maps.app.goo.gl/4mRYg1ruibUXMi798" },
  { id: 18, latitude: 14.635193402857432, longitude: 120.96304968465493, title: "Hospital 18", link: "https://maps.app.goo.gl/EWY9CEpcjTQBByew6" },
  { id: 19, latitude: 14.763427368895488, longitude: 121.04410927116369, title: "Hospital 19", link: "https://maps.app.goo.gl/Zje84osDhPg8QUZR9" },
  { id: 20, latitude: 14.626278273852051, longitude: 120.98800188836267, title: "Hospital 20", link: "https://maps.app.goo.gl/Eyus8C8bZxXcNf2D7" },
];

const clinics = [
  { id: 1, latitude: 14.676041, longitude: 121.043700, title: "Clinic 1", link: undefined },
  { id: 2, latitude: 14.670000, longitude: 121.050000, title: "Clinic 2", link: undefined },
];

const LocationScreen = () => {
  const [selectedType, setSelectedType] = useState<"Hospital" | "Clinic">("Hospital");

  const [region, setRegion] = useState({
    latitude: 14.676041,
    longitude: 121.043700,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const toggleMarkers = () => {
    setSelectedType((prev) => (prev === "Hospital" ? "Clinic" : "Hospital"));
  };

  return (
    <View style={styles.container}>
      <MapView key={selectedType} style={styles.map} region={region}>
        {(selectedType === "Clinic" ? clinics : hospitals).map((location) => (
          <Marker key={location.id} coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
            <Callout onPress={() => location.link && Linking.openURL(location.link)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{location.title}</Text>
                {location.link ? (
                  <Text style={styles.calloutLink}>📍 Tap to view on Google Maps</Text>
                ) : (
                  <Text style={styles.calloutText}>No link available</Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={toggleMarkers}>
        <Text style={styles.buttonText}>{selectedType === "Hospital" ? "Show Clinics" : "Show Hospitals"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  callout: { alignItems: "center", padding: 8 },
  calloutTitle: { fontWeight: "bold", fontSize: 16 },
  calloutText: { fontSize: 14, color: "gray" },
  calloutLink: { fontSize: 14, color: "blue", textDecorationLine: "underline" },
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
});
