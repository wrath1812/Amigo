import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

function RootNavigator() {
    const { isAuthenticated, loading } = useAuth();

    return loading ? (
        <Loader />
    ) : (
        <NavigationContainer>
            {isAuthenticated ? AppNavigator : AuthNavigator}
        </NavigationContainer>
    );
}

export default RootNavigator;
