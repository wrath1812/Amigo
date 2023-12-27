import { EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupNavigator from './GroupNavigator';
import { useAuth } from '../context/AuthContext';
import BalanceScreen from "../pages/BalanceScreen";
import Settings from '../pages/Settings';
import PAGES from '../constants/pages';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import SignUpScreen from '../pages/SignUpScreen';
const AppNavigator = () => {
    const { user } = useAuth();
    return user.name ? (
        <Tab.Navigator>
            <Tab.Group>
            <Tab.Screen
                    name={PAGES.BALANCE}
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
                    component={BalanceScreen}
                />
                <Tab.Screen
                    name={PAGES.GROUP_NAVIGATOR}
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

                <Tab.Screen name={PAGES.SETTINGS} component={Settings} />
            </Tab.Group>
        </Tab.Navigator>
    ) : (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name={PAGES.SIGN_UP}
                    options={{
                        headerShown: false,
                    }}
                    component={SignUpScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppNavigator;
