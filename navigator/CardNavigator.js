import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import AddCardForm from '../pages/AddCardForm';
import CardListScreen from '../pages/CardListScreen';

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
