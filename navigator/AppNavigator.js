import React from 'react';
import PAGES from '../constants/pages';
import CardNavigator from './CardNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const AppNavigator = (
    <Tab.Navigator>
    <Tab.Group>
        <Tab.Screen
            name={PAGES.CARD_NAVIGATOR}
            options={{
                headerShown: false,
            }}
            component={CardNavigator}
        />
        <Tab.Screen name={PAGES.LOGGED_OUT} component={()=><Text>rgeg</Text>} />
    </Tab.Group>
    </Tab.Navigator>
);

export default AppNavigator;
