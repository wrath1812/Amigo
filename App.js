import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'; // Import SafeAreaView
import CardList from './pages/cardList';
import Constants from 'expo-constants'; 
import * as LocalAuthentication from 'expo-local-authentication';

async function authenticateUser() {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate using biometrics',
      fallbackLabel: 'Enter PIN',
    });

    if (result.success) {
      // Authentication successful
      console.log('Authentication successful');
    } else {
      // Authentication failed or was canceled
      console.log('Authentication failed or canceled');
    }
  } catch (error) {
    // Handle any errors that occur during authentication
    console.error('Authentication error:', error);
  }
}


export default function App() {
  authenticateUser();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CardList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});
