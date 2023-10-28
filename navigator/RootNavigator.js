import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator();

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
