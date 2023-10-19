import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calcWidth, calcHeight } from '../helper/res';

const CardMenu = ({
    copyCardNumberToClipboard,
    setShowEditCard,
    setShowConfirmDelete,
}) => {
    return (
        <View style={styles.modalContent}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={copyCardNumberToClipboard}
            >
                <Ionicons
                    name="copy-outline"
                    size={calcWidth(8)}
                    color="blue"
                />
                <Text style={styles.menuText}>Copy Card Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={setShowEditCard}
            >
                <Ionicons
                    name="create-outline"
                    size={calcWidth(8)}
                    color="blue"
                />
                <Text style={styles.menuText}>Edit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setShowConfirmDelete(true)}
            >
                <Ionicons
                    name="trash-outline"
                    size={calcWidth(8)}
                    color="red"
                />
                <Text style={styles.menuText}>Delete Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    menuItem: {
        flexDirection: 'row',
        paddingVertical: calcHeight(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: calcHeight(2),
        paddingHorizontal: calcHeight(1),
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
};

export default CardMenu;
