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
        borderWidth: 1,
        borderColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 36, // Increase font size
        fontWeight: 'bold',
        color: 'black',
    },
    textContainer: {
        marginTop: 10, // Add gap between button and text
    },
    addCardText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default AddCardBox;
