import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator = (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen
                name={PAGES.LOGIN}
                options={{
                    headerShown: false,
                }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={PAGES.SIGN_UP}
                options={{
                    headerShown: false,
                }}
                component={SignUpScreen}
            />
            
        </Stack.Group>
    </Stack.Navigator>
);

export default AuthNavigator;
