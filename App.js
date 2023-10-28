import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import RootNavigator from './navigator/RootNavigator';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <SafeAreaProvider
            style={{
                paddingTop: Constants.statusBarHeight,
            }}
        >
            <StatusBar style="auto" />
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
// https://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number
