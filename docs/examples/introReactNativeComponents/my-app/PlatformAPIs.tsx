import React from 'react';
import {
  View,
  Text,
  Alert,
  Vibration,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

const App = () => {
  // Platform API: detect which OS we're running on
  const platform = Platform.OS; // 'ios' | 'android'
  const version = Platform.Version;

  // Alert API: native operating system dialog
  const showNativeAlert = () => {
    Alert.alert(
      'Native Alert',
      `This dialog is rendered by ${platform}'s native alert system`,
      [{ text: 'OK' }]
    );
  };

  // Vibration API: access device vibration hardware
  const triggerVibration = () => {
    Vibration.vibrate(500); // vibrate for 500ms
  };

  // Linking API: open URL with the system browser
  const openBrowser = () => {
    Linking.openURL('https://reactnative.dev');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform APIs from JavaScript</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
