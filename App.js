import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import RootNavigator from './navigator/RootNavigator';
import { AuthProvider } from './context/AuthContext';
import { ENV, SENTRY_DSN } from '@env';
import * as Sentry from 'sentry-expo';

Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    enableAutoPerformanceTracking: true,
    enableAutoSessionTracking: true,
    environment: ENV,
    debug: false,
});
function App() {
    return (
        <SafeAreaProvider
            style={{
                paddingTop:
                    Platform === 'android' ? Constants.statusBarHeight : 0,
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
