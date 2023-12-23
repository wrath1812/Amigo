import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import GroupListScreen from '../pages/GroupListScreen';
import TransactionScreen from '../pages/TransactionScreen';
import TransactionFormScreen from '../pages/TransactionForm';
import CreateGroupScreen from '../pages/CreateGroup';
const Stack = createNativeStackNavigator();
function GroupNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PAGES.GROUP_LIST}
                options={{
                    headerShown: false,
                }}
                component={GroupListScreen}
            />
            <Stack.Screen
                name={PAGES.TRANSACTION}
                component={TransactionScreen}
            />
            <Stack.Screen
                name={PAGES.ADD_TRANSACTION}
                component={TransactionFormScreen}
            />
            <Stack.Screen
            name={PAGES.ADD_GROUP}
            component={CreateGroupScreen}
            />
        </Stack.Navigator>
    );
}

export default GroupNavigator;
