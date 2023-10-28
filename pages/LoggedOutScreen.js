import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-native-paper';

function LoggedOutScreen() {
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        login();
    }, [isAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You are logged out.</Text>
            <Button
                onPress={login}
                style={styles.loginButton}
                labelStyle={styles.loginButtonText}
                mode="contained" // Use contained mode for a solid button
            >
                Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'black', // Set text color to white
    },
    loginButton: {
        marginTop: 20,
        borderRadius: 10, // Add some border radius to round the corners
        backgroundColor: 'blue', // Semi-transparent background for the button
    },
    loginButtonText: {
        fontSize: 16,
        color: 'white', // Set the text color of the button
    },
});

export default LoggedOutScreen;
