import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LoggedOutScreen() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>You are logged out.</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a', // Set the background color to blackish
    },
    text: {
        fontSize: 20,
        color: 'white', // Set text color to white
    },
});

export default LoggedOutScreen;
