import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import COLOR from "../constants/Colors";
import PAGES from "../constants/pages";
import LoginScreen from "../pages/LoginScreen";
import OTPScreen from "../pages/OTPScreen";
import OnboardingScreen from "../pages/OnBoardingScreen";
import { OtpProvider } from '../context/OtpContext';

const Stack = createNativeStackNavigator();

const AuthNavigator = (
    <OtpProvider>
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name={PAGES.ONBOARDING}
                    options={{
                        headerShown: false,
                    }}
                    component={OnboardingScreen}
                />
                <Stack.Screen
                    name={PAGES.LOGIN}
                    component={LoginScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: COLOR.APP_BACKGROUND,
                        },
                        title: null,
                    }}
                />

                <Stack.Screen
                    name={PAGES.OTP}
                    options={{
                        headerStyle: {
                            backgroundColor: COLOR.APP_BACKGROUND,
                        },
                        title: null,
                    }}
                    component={OTPScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    </OtpProvider>
);

export default AuthNavigator;
