import React from 'react';
import PAGES from '../constants/pages';
import CardNavigator from './CardNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons } from '@expo/vector-icons'; 
import BannerAd from '../components/BannerAd';
import SettingsNavigator from './SettingsNavigator';

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
                    <EvilIcons name="credit-card" size={size} color={color} />
                ),
            }}
            component={CardNavigator}
        />
        <Tab.Screen name={PAGES.SETTINGS_NAVIGATOR} component={SettingsNavigator}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <EvilIcons name="gear" size={size} color={color} />
                ),
                tabBarLabel: PAGES.SETTINGS,
                headerShown: false
            }}
         />
    </Tab.Group>
    </Tab.Navigator>
);

export default AppNavigator;
