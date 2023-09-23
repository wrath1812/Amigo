import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import PAGES from '../constants/pages';
// import CardList

const Stack = createNativeStackNavigator();
const AuthNavigator = (
    <Stack.Group>
        <Stack.Screen
            name={PAGES.LOGIN}
            options={{ headerTitleAlign: 'center' }}
            component={LoginScreen}
        />
    </Stack.Group>
);

export default AuthNavigator;
