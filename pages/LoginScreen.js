import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, Image, StatusBar, Alert, Platform, Dimensions
} from 'react-native';

// Make sure to use the correct path to your assets and helper functions
import LoginImage from '../assets/Login.png';
import COLOR from '../constants/Colors';
import PAGES from '../constants/pages';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const validateAndNavigate = () => {
    // Basic validation for a 10-digit phone number
    if (/^\d{10}$/.test(phoneNumber)) {
      navigation.navigate(PAGES.OTP, { phoneNumber });
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image source={LoginImage} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Hi there!</Text>
            <Text style={styles.promptText}>Please enter your phone number</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+1</Text>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={validateAndNavigate}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.APP_BACKGROUND, // Keep your color settings
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600, // Max width for larger screens
    paddingHorizontal: 20, // Adjusted padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.2, // Adjusted for screen width
    height: width * 0.2, // Adjusted for screen width
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24, // Adjusted for readability
    fontWeight: 'bold',
    color: COLOR.TEXT,
  },
  promptText: {
    fontSize: 14, // Adjusted for readability
    color: COLOR.TEXT,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 18,
    color: COLOR.TEXT,
    marginRight: 10,
  },
  phoneNumberInput: {
    flex: 1,
    color: COLOR.TEXT,
    fontSize: 18,
  },
  button: {
    backgroundColor: COLOR.BUTTON,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
  },
  buttonText: {
    fontSize: 18,
    color: COLOR.TEXT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
