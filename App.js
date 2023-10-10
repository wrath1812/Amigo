import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import RootNavigator from './navigator/RootNavigator';
import { AuthProvider } from './context/AuthContext';
import * as Sentry from 'sentry-expo';


Sentry.init({
    dsn: 'https://458aa34234bdfb742494c836127ddf3e@o4505941411495936.ingest.sentry.io/4505941423554560',
    enableInExpoDevelopment: true,
    enableAutoPerformanceTracking: true,
    enableAutoSessionTracking: true,
    environment: 'development',
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
