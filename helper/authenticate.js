import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

async function authenticateUser() {
    try {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage:
                Platform.OS === 'android'
                    ? 'Authenticate using biometrics'
                    : 'Authenticate using FaceID',
            fallbackLabel: 'Enter PIN',
        });
        return result;
    } catch (error) {
        console.error('Authentication error:', error);
    }
}

export default authenticateUser;
