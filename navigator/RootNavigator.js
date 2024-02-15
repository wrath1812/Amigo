import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import linking from '../helper/linking';
import { TransactionProvider } from '../context/TransactionContext';
import { GroupProvider } from '../context/GroupContext';
import { ContactsProvider } from '../hooks/useContacts';
function RootNavigator() {
    const { user } = useAuth();

    return (
        <ContactsProvider>
            <GroupProvider>
                <TransactionProvider>
                    <NavigationContainer linking={linking}>
                        {user ? <AppNavigator /> : AuthNavigator}
                    </NavigationContainer>
                </TransactionProvider>
            </GroupProvider>
        </ContactsProvider>
    );
}

export default RootNavigator;
