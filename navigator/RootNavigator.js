import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import { generateEncryptionKey } from "../helper/encryption";
import { storeSecret,retrieveSecret } from '../helper/secureStorage';

const Stack = createNativeStackNavigator();

function RootNavigator() {

    const { isAuthenticated } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={PAGES.LOGIN}>
                {isAuthenticated ? AppNavigator:AuthNavigator}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
