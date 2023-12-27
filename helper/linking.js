import * as Linking from 'expo-linking';
const prefix = Linking.createURL('/');
const linking = {
    prefixes: [prefix, 'split-cash://'],
    async getInitialURL() {
        const url = await Linking.getInitialURL();
        if (url != null) {
            return url;
        }
        return null;
    },
    subscribe(listener) {
        const onReceiveURL = ({ url }) => listener(url);
        Linking.addEventListener('url', onReceiveURL);
        return () => {
            Linking.removeEventListener('url', onReceiveURL);
        };
    },
    config: {},
};
export default linking;
