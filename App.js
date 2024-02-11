import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
import RootNavigator from './navigator/RootNavigator';
function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}

export default App;
