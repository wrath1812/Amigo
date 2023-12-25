import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import GroupListScreen from '../pages/GroupListScreen';
import TransactionScreen from '../pages/TransactionScreen';
import TransactionFormScreen from '../pages/TransactionForm';
import CreateGroupScreen from '../pages/CreateGroup';
import JoinGroup from '../pages/JoinGroup';
import SignUpScreen from '../pages/SignUpScreen';
const Stack = createNativeStackNavigator();
import { useAuth } from '../context/AuthContext';
function GroupNavigator() {
    const {user}=useAuth();
    return (
        <Stack.Navigator initialRouteName={user.name?PAGES.GROUP_LIST:PAGES.SIGN_UP}>
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
            <Stack.Screen name={PAGES.JOIN_GROUP} component={JoinGroup} />
            <Stack.Screen
                name={PAGES.SIGN_UP}
               options={{
                    headerShown:false
                }
                }
                component={SignUpScreen}
            />
        </Stack.Navigator>
    );
}

export default GroupNavigator;
