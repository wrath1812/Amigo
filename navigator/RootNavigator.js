import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../stores/auth';
import linking from '../helper/linking';
import { TransactionProvider } from '../context/TransactionContext';
import { GroupProvider } from '../context/GroupContext';
import { NetStatusProvider } from '../context/NetStatus';
function RootNavigator() {
    const { user } = useAuth();

    return (
        <NetStatusProvider>
            <GroupProvider>
                <TransactionProvider>
                    <NavigationContainer linking={linking}>
                        {user ? <AppNavigator /> : AuthNavigator}
                    </NavigationContainer>
                </TransactionProvider>
            </GroupProvider>
        </NetStatusProvider>
    );
}

export default RootNavigator;
