import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, SafeAreaView, Image
} from 'react-native';
import LoginImage from '../assets/Login.png';
import COLOR from '../constants/Colors';
import PAGES from '../constants/pages';
import Button from '../components/Button';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState("+91");
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);

  const getTextInputStyle = (isFocused) => ({
    ...styles.phoneNumberInput,
    borderBottomColor: isFocused ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image source={LoginImage} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Hi there!</Text>
            <Text style={styles.promptText}>Please enter your phone number</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <TextInput
              style={getTextInputStyle(isCodeFocused)}
              keyboardType="phone-pad"
              value={countryCode}
              onChangeText={setCountryCode}
              maxLength={4}
              onFocus={() => setIsCodeFocused(true)}
              onBlur={() => setIsCodeFocused(false)}
            />
          </View>
          <TextInput
            style={getTextInputStyle(isPhoneFocused)}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onFocus={() => setIsPhoneFocused(true)}
            onBlur={() => setIsPhoneFocused(false)}
          />
        </View>
        <Button 
          title="Send OTP"
          onPress={() => navigation.navigate(PAGES.OTP)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.APP_BACKGROUND,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: calcWidth(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: calcWidth(5),
  },
  image: {
    width: calcWidth(20),
    height: calcHeight(20),
    marginRight: calcWidth(5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: calcHeight(10),
  },
  headerText: {
    fontSize: getFontSizeByWindowWidth(18),
    fontWeight: 'bold',
    color: COLOR.TEXT,
    paddingBottom: calcHeight(3),
  },
  promptText: {
    fontSize: 14,
    color: COLOR.TEXT,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumberInput: {
    flex: 1,
    color: COLOR.TEXT,
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: calcHeight(2),
    marginLeft: calcWidth(1)
  },
  countryCodeContainer: {
    width: calcWidth(15), // Adjust width as needed
  },
  countryCodeInput: {
    // Styles for the country code input
  },
});

export default LoginScreen;
