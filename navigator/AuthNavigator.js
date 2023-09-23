import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import LoggedOutScreen from '../pages/LoggedOutScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = (
    <Stack.Group>
        <Stack.Screen
            name={PAGES.LOGGED_OUT}
            options={{ headerTitleAlign: 'center' }}
            component={LoggedOutScreen}
        />
    </Stack.Group>
);

export default AuthNavigator;
