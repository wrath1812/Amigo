import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import CardListScreen from '../pages/CardListScreen';
import AddCardForm from '../pages/AddCardForm';

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
        <Stack.Screen
        name={PAGES.ADD_CARD}
        options={{
            headerShown: false,
        }}
        component={AddCardForm}
        />
    </Stack.Group>
);

export default AppNavigator;
