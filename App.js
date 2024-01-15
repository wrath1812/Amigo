import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/AuthContext';
import { ContactsProvider } from './hooks/useContacts';
import RootNavigator from './navigator/RootNavigator';
function App() {
    return (
        <SafeAreaProvider
            style={{
                paddingTop: Constants.statusBarHeight,
            }}
        >
            <StatusBar style="auto" />
            <AuthProvider>
                <ContactsProvider>
                <RootNavigator />
                </ContactsProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
