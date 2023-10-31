import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function AddCardBox({ showModal }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showModal} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.addCardText}>Add Card</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10, // Add some border radius for a rounded look
        padding: 20,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'blue', // Set the button background to black
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white', // Set the text color to white
    },
    textContainer: {
        marginTop: 10,
    },
    addCardText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', // Set the text color to black
    },
});

export default AddCardBox;
