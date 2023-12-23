import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import LoginScreen from '../pages/LoginScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen
                name={"Login"}
                options={{
                    headerShown: false,
                }}
                component={LoginScreen }
            />
        </Stack.Group>
    </Stack.Navigator>
);

export default AuthNavigator;
