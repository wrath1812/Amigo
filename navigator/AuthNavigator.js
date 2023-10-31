import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import LoggedOutScreen from '../pages/LoggedOutScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen
                name={PAGES.LOGGED_OUT}
                options={{
                    headerShown: false,
                }}
                component={LoggedOutScreen}
            />
        </Stack.Group>
    </Stack.Navigator>
);

export default AuthNavigator;
