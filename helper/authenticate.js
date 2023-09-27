import * as LocalAuthentication from 'expo-local-authentication';

async function authenticateUser() {
    try {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate using biometrics',
            fallbackLabel: 'Enter PIN',
        });
        return result;
    } catch (error) {
        console.error('Authentication error:', error);
    }
}

export default authenticateUser;
