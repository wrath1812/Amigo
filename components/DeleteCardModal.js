import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res'; // Import your utility functions here

const DeleteCardModal = ({ onDelete, onCancel, visible }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete this card?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteCardModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: calcWidth(80), // 80% of the device width
        alignItems: 'center',
        padding: calcHeight(2), // 2% of the device height
    },
    modalText: {
        fontSize: getFontSizeByWindowWidth(18), // Font size based on device width
        fontWeight: 'bold',
        marginVertical: calcHeight(2), // 2% of the device height
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: calcHeight(2), // 2% of the device height
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: calcWidth(5), // 5% of the device width
        paddingVertical: calcHeight(2), // 2% of the device height
        borderRadius: 5,
        marginHorizontal: calcWidth(2), // 2% of the device width
    },
    cancelButton: {
        backgroundColor: 'gray',
        paddingHorizontal: calcWidth(5), // 5% of the device width
        paddingVertical: calcHeight(2), // 2% of the device height
        borderRadius: 5,
        marginHorizontal: calcWidth(2), // 2% of the device width
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: getFontSizeByWindowWidth(16), // Font size based on device width
    },
});
