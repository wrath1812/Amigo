import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import RootNavigator from './navigator/RootNavigator';
import {AuthProvider} from './context/AuthContext';
export default function App() {
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
