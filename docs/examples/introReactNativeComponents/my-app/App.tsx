import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Vibration,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

const App = () => {
  const platform = Platform.OS;
  const version = Platform.Version;

  const showNativeAlert = () => {
    Alert.alert(
      'Native Alert',
      `This dialog is rendered by ${platform}'s native alert system`,
      [{ text: 'OK' }]
    );
  };

  const triggerVibration = () => {
    Vibration.vibrate(500);
  };

  const openBrowser = () => {
    Linking.openURL('https://reactnative.dev');
  };

  return (
    <ScrollView style={styles.scroll}>
      {/* ===== SECTION 1: Describe UI appearance & behavior ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          describe your UI's appearance and behavior
        </Text>
        <Text>Some text</Text>
        <View>
          <Text>Some more text</Text>
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
            }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <TextInput
          style={styles.input}
          defaultValue="You can type in me"
        />
      </View>

      {/* ===== SECTION 2: Access platform APIs ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          access your platform's APIs
        </Text>
        <Text style={styles.info}>
          Running on: {platform} (version {String(version)})
        </Text>

        <Pressable style={styles.button} onPress={showNativeAlert}>
          <Text style={styles.buttonText}>Alert API (native dialog)</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={triggerVibration}>
          <Text style={styles.buttonText}>Vibration API (hardware)</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={openBrowser}>
          <Text style={styles.buttonText}>Linking API (open browser)</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: 60,
  },
  section: {
    padding: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  info: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
