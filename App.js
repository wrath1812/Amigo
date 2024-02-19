import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
import RootNavigator from './navigator/RootNavigator';
function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
                <RootNavigator />
        </SafeAreaProvider>
    );
}

export default App;
