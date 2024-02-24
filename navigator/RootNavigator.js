import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../stores/auth';
import linking from '../helper/linking';
import { TransactionProvider } from '../context/TransactionContext';
import { GroupProvider } from '../context/GroupContext';

function RootNavigator() {
    const { user } = useAuth();

    return (
        <GroupProvider>
            <TransactionProvider>
                <NavigationContainer linking={linking}>
                    {user ? <AppNavigator /> : AuthNavigator}
                </NavigationContainer>
            </TransactionProvider>
        </GroupProvider>
    );
}

export default RootNavigator;
