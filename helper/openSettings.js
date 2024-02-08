import { Linking, Platform } from 'react-native';

const openSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        Linking.openSettings();
    }
};

export default openSettings;
