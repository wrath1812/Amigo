import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import CardListScreen from '../pages/CardListScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = (
    <Stack.Group>
        <Stack.Screen
            name={PAGES.CARD_LIST}
            options={{ 
                headerShown: false,
             }}
            component={CardListScreen}
        />
    </Stack.Group>
);

export default AppNavigator;
