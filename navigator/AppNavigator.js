import React from 'react';
import PAGES from '../constants/pages';
import CardNavigator from './CardNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons } from '@expo/vector-icons'; 
import Settings from '../pages/Settings';
import BannerAd from '../components/BannerAd';

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
        <Tab.Screen name={PAGES.SETTINGS} component={Settings}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <EvilIcons name="gear" size={size} color={color} />
                ),
                header: () => (
                    <BannerAd/> // Use your custom header component here
                  ),
            }}
         />
    </Tab.Group>
    </Tab.Navigator>
);

export default AppNavigator;
