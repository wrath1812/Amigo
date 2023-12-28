import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
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
                <TransactionProvider>
                    <RootNavigator />
                </TransactionProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
