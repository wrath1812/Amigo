import { EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupNavigator from './GroupNavigator';
import { useAuth } from '../context/AuthContext';
import BalanceScreen from '../pages/BalanceScreen';
import Settings from '../pages/Settings';
import PAGES from '../constants/pages';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import SignUpScreen from '../pages/SignUpScreen';
import COLOR from '../constants/Colors';
import { calcHeight } from '../helper/res';
import TabBarIcon from '../components/TabBarIcon';
import tabBarStyle from '../constants/tabBarStyle';
import GroupListScreen from '../pages/GroupListScreen';

const AppNavigator = () => {
    const { user } = useAuth();
    return user.name ? (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => null, // Add this line to disable labels
                tabBarStyle: tabBarStyle,
            }}
        >
            <Tab.Group>

            <Tab.Screen
                    name={PAGES.GROUP_NAVIGATOR}
                    options={{
                        tabBarIcon: (tabBarProps) => (
                            <TabBarIcon
                                tabBarProps={tabBarProps}
                                screen={PAGES.BALANCE}
                            />
                        ),
                        headerShown: false,
                    }}
                    component={GroupNavigator}
                />

                <Tab.Screen
                    name={PAGES.GROUP_LIST}
                    component={GroupListScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: COLOR.APP_BACKGROUND,
                        },
                        title: null,
                        tabBarIcon: (tabBarProps) => (
                            <TabBarIcon
                                tabBarProps={tabBarProps}
                                screen={PAGES.GROUP_LIST}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name={PAGES.SETTINGS}
                    component={Settings}
                    options={{
                        tabBarIcon: (tabBarProps) => (
                            <TabBarIcon
                                tabBarProps={tabBarProps}
                                screen={PAGES.SETTINGS}
                            />
                        ),
                    }}
                />
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
