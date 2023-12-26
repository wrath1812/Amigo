import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

function RootNavigator() {
    const { user, loading } = useAuth();

    return loading ? (
        <Loader />
    ) : (
        <NavigationContainer>
            {user ? <AppNavigator/> : AuthNavigator}
        </NavigationContainer>
    );
}

export default RootNavigator;
