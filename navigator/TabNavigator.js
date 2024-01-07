import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PAGES from '../constants/pages';
const Tab = createBottomTabNavigator();
import COLOR from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import tabBarStyle from '../constants/tabBarStyle';
import GroupListScreen from '../pages/GroupListScreen';
import ExpenseScreen from '../pages/ExpenseScreen';
import BalanceScreen from '../pages/BalanceScreen';
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => null, // Add this line to disable labels
                tabBarStyle,
            }}
        >
            <Tab.Group>
            <Tab.Screen
                name={PAGES.BALANCE}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabBarProps) => (
                        <TabBarIcon
                            tabBarProps={tabBarProps}
                            screen={PAGES.BALANCE}
                        />
                    ),
                }}
                component={BalanceScreen}
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
                    name={PAGES.EXPENSE}
                    component={ExpenseScreen}
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
   
    );
};

export default TabNavigator;
