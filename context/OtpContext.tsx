import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, Dispatch, SetStateAction, useState, useEffect } from 'react';
import PAGES from '../constants/pages';
import { useAuth } from '../stores/auth';
import apiHelper from '../helper/apiHelper';

const OtpContext = createContext<{
  loginWithPhoneNumber: (phoneNumber: string) => void;
  verifyOtp: (otp: string) => void;
}>({
  loginWithPhoneNumber: () => {},
  verifyOtp: () => {},
});

export const OtpProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();

  const { login } = useAuth();

  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    let subscriber;

    (async () => {
      // @ts-ignore
      const { default: auth } = await import('@react-native-firebase/auth');

      subscriber = auth().onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          try {

            const firebaseIdToken = await firebaseUser.getIdToken();
            
            const { data: { user, token } } = await apiHelper.post(`/auth/verifyOTP`, { payload: firebaseIdToken });
            
            login({ user, token })
            navigation.navigate(PAGES.BALANCE);
          } catch (error) {
            console.log('Error verifying OTP', error);
          }
        }
      });
    })();

    return subscriber;
  }, []);

  const loginWithPhoneNumber = async (phoneNumber: string) => {
    // @ts-ignore
    const { default: auth } = await import('@react-native-firebase/auth');
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  const verifyOtp = async (otp: string) => {
    try {
      await confirm?.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <OtpContext.Provider value={{ loginWithPhoneNumber, verifyOtp }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => React.useContext(OtpContext);
