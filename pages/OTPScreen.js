import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import { calcHeight, calcWidth } from '../helper/res';

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
        <Text style={styles.headerText}>OTP Verification</Text>
        <Text style={styles.promptText}>Enter the code sent to +1 999 888...</Text>
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
            />
          ))}
        </View>
        <Button
          title="Verify"
          onPress={() => navigation.navigate('NextScreen')} // Update with the actual navigation
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
    fontSize: calcWidth(6),
    fontWeight: 'bold',
    color: COLOR.TEXT,
    paddingBottom: calcHeight(2),
  },
  promptText: {
    fontSize: calcWidth(4),
    color: COLOR.TEXT,
    paddingBottom: calcHeight(4),
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
  }
});

export default OTPScreen;
