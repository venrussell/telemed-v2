import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Adjust the path to your types file

const ImageDetection = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      if (result.assets[0].base64) {
        uploadImage(result.assets[0].base64);
      }
    }
  };

  const uploadImage = async (base64Image: string | undefined) => {
    if (!base64Image) return;

    setLoading(true);
    try {
      const response = await axios.post("http://192.168.1.100:5000/upload", {
        image: base64Image
      });

      setResult(response.data.result);
      Alert.alert("Analysis Result", response.data.result);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to analyze the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "http://192.168.1.100:5000/video_feed" }} style={styles.liveFeed} />
      <Button title="Capture Image" onPress={captureImage} />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.capturedImage} />}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        result && <Text style={styles.resultText}>{result}</Text>
      )}
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  liveFeed: { width: 300, height: 400, borderRadius: 10, marginBottom: 20 },
  capturedImage: { width: 200, height: 200, borderRadius: 10, marginTop: 10 },
  resultText: { marginTop: 10, fontSize: 16, textAlign: 'center' },
});

export default ImageDetection;
