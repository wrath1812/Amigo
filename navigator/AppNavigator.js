import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import PAGES from '../constants/pages';
const Stack = createNativeStackNavigator();
import SignUpScreen from '../pages/SignUpScreen';
import COLOR from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import TransactionDetail from '../pages/TransactionDetails';
import SelectGroup from '../pages/SelectGroup';
import GroupSplitScreen from '../pages/GroupSplitScreen';
import SelectPaidBy from '../pages/SelectPaidBy';
import GroupBalance from '../pages/GroupBalanceScreen';
import PaymentScreen from '../pages/PaymentScreen';
import SearchScreen from '../pages/Search';
import AccountScreen from '../pages/AccountScreen';
import QRCodeScanner from '../pages/QRCodeScanner';
import UPIAppSelection from '../pages/UPIAppSelection';
import TabNavigator from './TabNavigator';
import Group from '../pages/Group';
import CreateGroup from '../pages/CreateGroup';
import { getFontSizeByWindowWidth } from '../helper/res';
import TransactionFormScreen from '../pages/TransactionForm';
import InvitationLandingScreen from '../pages/InvitationLandingScreen';
import GroupSettings from '../pages/GroupSettings';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
import { TransactionProvider } from '../context/TransactionContext';
import { GroupProvider } from '../context/GroupContext';
import AddPeople from '../pages/AddPeople';
import { ContactsProvider } from '../hooks/useContacts';

const AppNavigator = () => {
    const { user } = useAuth();
    return (
        <ContactsProvider>
            <GroupProvider>
                <TransactionProvider>
                    <Stack.Navigator>
                        {user.name ? (
                            <Stack.Group>
                                <Stack.Screen
                                    name={PAGES.TAB_NAVIGATOR}
                                    options={{
                                        headerShown: false,
                                        tabBarIcon: (tabBarProps) => (
                                            <TabBarIcon
                                                tabBarProps={tabBarProps}
                                                screen={PAGES.BALANCE}
                                            />
                                        ),
                                    }}
                                    component={TabNavigator}
                                />
                                <Stack.Screen
                                    name={PAGES.SELECT_PAID_BY}
                                    component={SelectPaidBy}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        title: null,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.GROUP_SETTINGS}
                                    component={GroupSettings}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.SCANNER}
                                    component={QRCodeScanner}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.GROUP_BALANCE}
                                    component={GroupBalance}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.SEARCH}
                                    component={SearchScreen}
                                    options={
                                        {
                                            // headerShown: false,
                                        }
                                    }
                                />
                                <Stack.Screen
                                    name={PAGES.ACCOUNT}
                                    component={AccountScreen}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.FAQ}
                                    component={FAQ}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />

                                <Stack.Screen
                                    name={PAGES.ABOUT}
                                    component={About}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />

                                <Stack.Screen
                                    name={PAGES.UPI_APP_SELECTION}
                                    component={UPIAppSelection}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />

                                <Stack.Screen
                                    name={PAGES.ADD_PEOPLE}
                                    component={AddPeople}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTintColor: '#fff',
                                    }}
                                />

                                <Stack.Screen
                                    name={PAGES.PAYMENT}
                                    component={PaymentScreen}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTitleAlign: 'left', // Aligns the title to the left
                                        headerTintColor: '#fff', // Sets the title color to white
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
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        title: null,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.SELECT_GROUP}
                                    component={SelectGroup}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        headerTitle: 'Add groups',
                                        headerTitleStyle: {
                                            color: 'white', // Sets the title color to white
                                            fontWeight: 'bold', // Makes the title bold
                                            fontSize:
                                                getFontSizeByWindowWidth(20),
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name={PAGES.ADD_TRANSACTION}
                                    component={TransactionFormScreen}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        title: null,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.CREATE_GROUP}
                                    component={CreateGroup}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        title: null,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.TRANSACTION_DETAIL}
                                    component={TransactionDetail}
                                    options={{
                                        headerStyle: {
                                            backgroundColor:
                                                COLOR.APP_BACKGROUND,
                                        },
                                        title: null,
                                    }}
                                />
                                <Stack.Screen
                                    name={PAGES.INVITATION_LANDING_PAGE}
                                    component={InvitationLandingScreen}
                                />
                            </Stack.Group>
                        ) : (
                            <Stack.Screen
                                name={PAGES.SIGN_UP}
                                options={{
                                    headerShown: false,
                                }}
                                component={SignUpScreen}
                            />
                        )}
                    </Stack.Navigator>
                </TransactionProvider>
            </GroupProvider>
        </ContactsProvider>
    );
};

export default AppNavigator;
