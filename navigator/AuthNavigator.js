import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Back from "../assets/back.png";
import COLOR from '../constants/Colors';
import PAGES from '../constants/pages';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import OTPScreen from "../pages/OTPScreen";
const Stack = createNativeStackNavigator();

import OnboardingScreen from '../pages/OnBoardingScreen';
const AuthNavigator = (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen
            name={PAGES.ONBOARDING}
            options={{
                headerShown:false
            }
            }
            component={OnboardingScreen}
            />
            <Stack.Screen
    name={PAGES.LOGIN}
    component={LoginScreen}
    options={{
        headerStyle: {
            backgroundColor: COLOR.APP_BACKGROUND
        },
        title:null
    }}
/>

<Stack.Screen
                name={PAGES.OTP}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND
                    },
                    title:null
                }}
                component={OTPScreen}
            />
            <Stack.Screen
                name={PAGES.SIGN_UP}
               options={{
                    headerShown:false
                }
                }
                component={SignUpScreen}
            />
        </Stack.Group>
    </Stack.Navigator>
);

export default AuthNavigator;
