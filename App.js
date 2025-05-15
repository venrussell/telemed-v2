import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Symptoms Checker</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Bot Profile */}
      <View style={styles.botContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/doctor-male.png' }}
          style={styles.botImage}
        />
        <Text style={styles.botName}>Medical Bot</Text>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Enter a brief patient's description and user will provide a list of possible disease diagnoses.
          </Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type symptoms here..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={24} color="#fff" />
        <Icon name="location-outline" size={24} color="#fff" />
        <Icon name="chatbubble-outline" size={24} color="#fff" />
        <Icon name="person-outline" size={24} color="#fff" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#7B4B94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  botImage: {
    width: 80,
    height: 80,
    tintColor: '#7B4B94',
  },
  botName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  messageBox: {
    marginTop: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
  },
  messageText: {
    color: '#555',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 'auto',
    marginBottom: 60,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#7B4B94',
    padding: 10,
    borderRadius: 30,
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#7B4B94',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
  },
});
