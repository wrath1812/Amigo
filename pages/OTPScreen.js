import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView,Image } from 'react-native';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import OTPImage from "../assets/OTPImage.png";
import PAGES from '../constants/pages';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef(otp.map(() => React.createRef()));

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next input if text is entered
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If backspace is used and text is deleted, focus on the previous input
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Autofocus on the first input on initial render
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

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
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputRefs.current[index] = ref}
              style={styles.otpInput}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleOTPChange(text, index)}
              maxLength={1}
              placeholderTextColor="#D3D3D3"
            />
          ))}
        </View>
        <Button
          title="Verify"
          onPress={() => navigation.navigate(PAGES.SIGN_UP)} // Update with the actual navigation
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
  resendText: {
    color: COLOR.PRIMARY,
    fontSize: calcWidth(3.5),
    marginTop: calcHeight(2),
  },
  image: {
    width: calcWidth(20),
    height: calcHeight(20),
    marginRight: calcWidth(5),
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
  }
});

export default OTPScreen;
