import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, SafeAreaView, Image
} from 'react-native';
import LoginImage from '../assets/Login.png';
import COLOR from '../constants/Colors';
import PAGES from '../constants/pages';
import Button from '../components/Button';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import sendOTP from '../helper/sendOTP';
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState("91");
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
          <View style={{flexDirection:"row"}}>
          <View style={styles.plusIconContainer}>
            <Text  style={getTextInputStyle(isCodeFocused)}>+</Text>
          </View>
          <View style={styles.countryCodeContainer}>
            <TextInput
              style={getTextInputStyle(isCodeFocused)}
              keyboardType="phone-pad"
              value={countryCode}
              onChangeText={setCountryCode}
              maxLength={3}
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
            placeholderTextColor="#D3D3D3"
          />
          </View>
          <View style={styles.buttonContainer}>
           <Button 
          title="Send OTP"
          onPress={() => {
            sendOTP(countryCode+phoneNumber,)
            navigation.navigate(PAGES.OTP,{countryCode,phoneNumber})
          }
          }
        />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.APP_BACKGROUND,
  },
  innerContainer: {
    paddingHorizontal: calcWidth(5),
    marginTop:calcHeight(5)
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: calcWidth(5),
    marginBottom:calcHeight(5),

  },
  image: {
    width: calcWidth(20),
    aspectRatio:1,
    marginRight: calcWidth(5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerText: {
    fontSize: getFontSizeByWindowWidth(18),
    fontWeight: 'bold',
    color: COLOR.TEXT,
    paddingBottom: calcHeight(2),
  },
  promptText: {
    fontSize: 14,
    color: COLOR.TEXT,
  },
  inputContainer: {
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
    width: calcWidth(12), // Adjust width as needed
  },
});

export default LoginScreen;
