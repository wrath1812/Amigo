import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import GroupListScreen from '../pages/GroupListScreen';
import TransactionFormScreen from '../pages/TransactionForm';
import CreateGroupScreen from '../pages/CreateGroup';
import JoinGroup from '../pages/JoinGroup';
import { View, Text } from 'react-native';
import { calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import Group from '../pages/Group';
import COLOR from '../constants/Colors';
import CreateGroup from '../pages/CreateGroup';
const Stack = createNativeStackNavigator();
import TransactionDetail from '../pages/TransactionDetails';
import SelectGroup from '../pages/SelectGroup';
import GroupSplitScreen from '../pages/GroupSplitScreen';
import SelectPaidBy from '../pages/SelectPaidBy';
function GroupNavigator() {
    return (
        <Stack.Navigator initialRouteName={PAGES.GROUP_LIST}>
            <Stack.Screen
                name={PAGES.GROUP_LIST}
                component={GroupListScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />
            <Stack.Screen
                name={PAGES.SELECT_PAID_BY}
                component={SelectPaidBy}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />

            <Stack.Screen
                name={PAGES.GROUP}
                component={Group}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={PAGES.GROUP_SPLIT_SCREEN}
                component={GroupSplitScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />
            <Stack.Screen
                name={PAGES.SELECT_GROUP}
                component={SelectGroup}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    headerTitle: 'Add groups',
                    headerTitleStyle: {
                        color: 'white', // Sets the title color to white
                        fontWeight: 'bold', // Makes the title bold
                        fontSize: getFontSizeByWindowWidth(20),
                    },
                }}
            />

            <Stack.Screen
                name={PAGES.ADD_TRANSACTION}
                component={TransactionFormScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />
            <Stack.Screen
                name={PAGES.CREATE_GROUP}
                component={CreateGroup}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />
            <Stack.Screen
                name={PAGES.TRANSACTION_DETAIL}
                component={TransactionDetail}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.APP_BACKGROUND,
                    },
                    title: null,
                }}
            />
            <Stack.Screen name={PAGES.JOIN_GROUP} component={JoinGroup} />
        </Stack.Navigator>
    );
}

export default GroupNavigator;
