import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigator/RootNavigator';
import FlashMessage from 'react-native-flash-message';
function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <RootNavigator />
            <FlashMessage
                position="top"
                duration={2000}
            />

        </SafeAreaProvider>
    );
}

export default App;
