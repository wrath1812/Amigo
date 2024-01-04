import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import Loader from '../components/Loader';

import PAGES from '../constants/pages';
import apiHelper from '../helper/apiHelper';

const UPIAppSelection= ({ navigation }) => {
    const [groupId, setGroupId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        setLoading(true);
        try {
            await apiHelper.post(`group/${groupId}/join`);
        } catch (e) {}
        setLoading(false);
        navigation.navigate(PAGES.GROUP_LIST);
    };

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Group Id"
                onChangeText={setGroupId}
                value={groupId}
            />
            <TouchableOpacity style={styles.button} onPress={handleJoin}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        width: '80%',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100, // Add rounded border to the image
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white', // Set text color to white
    },
    input: {
        width: '100%', // Adjusted input width to be responsive
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white', // Set input background color to white
    },
    button: {
        width: '100%', // Adjusted button width to be responsive
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default UPIAppSelection;
