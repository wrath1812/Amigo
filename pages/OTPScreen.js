import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import OTPImage from "../assets/OTPImage.png";
import PAGES from '../constants/pages';

const OTPScreen = ({ navigation,route:{params:{countryCode,phoneNumber}} }) => {
  const [otp, setOtp] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOTPChange = (text) => {
    setOtp(text);
  };

  const otpBoxes = Array.from({ length: 6 }).map((_, index) => {
    const digit = otp[index] || '';
    const isFocused = index === otp.length;
    const boxStyle = isFocused ? styles.highlightedBox : styles.otpInput;

    return (
      <Pressable key={index} style={boxStyle} onPress={() => inputRef.current.focus()}>
        <Text style={styles.otpText}>{digit}</Text>
      </Pressable>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image source={OTPImage} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>OTP Verification</Text>
            <Text style={styles.promptText}>Enter the code sent to +1 999 888...</Text>
          </View>
        </View>
        <View style={styles.otpContainer}>
          {otpBoxes}
        </View>
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          keyboardType="number-pad"
          value={otp}
          onChangeText={handleOTPChange}
          maxLength={6}
          autoFocus
        />
        <Button
          title="Verify"
          onPress={() => navigation.navigate(PAGES.SIGN_UP)} // Update with actual navigation
        />
        <Text style={styles.resendText}>Didn’t receive the code? Resend</Text>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: calcWidth(5),
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: calcHeight(4),
  },
  otpInput: {
    width: calcWidth(10),
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: calcWidth(5),
    color: COLOR.TEXT,
  },
  highlightedBox: {
    width: calcWidth(10),
    borderBottomWidth: 2,
    borderColor: COLOR.PRIMARY,
    textAlign: 'center',
    fontSize: calcWidth(5),
    color: COLOR.TEXT,
  },
  otpText: {
    fontSize: getFontSizeByWindowWidth(20),
    color: COLOR.TEXT,
    marginBottom:calcHeight(2)
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendText: {
    color: COLOR.PRIMARY,
    fontSize: calcWidth(3.5),
    marginTop: calcHeight(2),
  },
  image: {
    width: calcWidth(20),
    height: calcHeight(20),
    marginRight: calcWidth(5),
  }
});

export default OTPScreen;
