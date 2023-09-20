import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import LoginScreen from './pages/LoginScreen';
import CardList from './pages/cardList';
import SignupScreen from './pages/SignUpScreen';
export default function App() {
  return (
    <SafeAreaProvider style={{backgroundColor:"#000",paddingTop:Platform==='android' ? Constants.statusBarHeight:0}}>
      <StatusBar style="auto" />
      {/* <LoginScreen /> */}
      {/* <CardList /> */}
      <SignupScreen />
    </SafeAreaProvider>
  );
}


