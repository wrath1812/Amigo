import { EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import GroupNavigator from './GroupNavigator';
import PAGES from '../constants/pages';

const Tab = createBottomTabNavigator();
const AppNavigator = (
    <Tab.Navigator>
        <Tab.Group>
            <Tab.Screen
                name={PAGES.CARD_NAVIGATOR}
                options={{
                    headerShown: false,
                    tabBarLabel: PAGES.CARD_LIST,
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons
                            name="credit-card"
                            size={size}
                            color={color}
                        />
                    ),
                }}
                component={GroupNavigator}
            />
        </Tab.Group>
    </Tab.Navigator>
);

export default AppNavigator;
