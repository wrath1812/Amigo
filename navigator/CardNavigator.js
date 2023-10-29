import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import CardListScreen from '../pages/CardListScreen';
import AddCardForm from '../pages/AddCardForm';

const Stack = createNativeStackNavigator();
function CardNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PAGES.CARD_LIST}
                options={{
                    headerShown: false,
                }}
                component={CardListScreen}
            />
            <Stack.Screen name={PAGES.ADD_CARD} component={AddCardForm} />
        </Stack.Navigator>
    );
}

export default CardNavigator;
