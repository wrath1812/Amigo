import { ActivityIndicator, SafeAreaView } from 'react-native';

function Loader() {
    return (
        <SafeAreaView style={{ backgroundColor: '#1a1a1a' }}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    );
}

export default Loader;
