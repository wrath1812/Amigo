import Card from './card';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { useAuth } from '../context/AuthContext';
import { calcHeight, calcWidth } from '../helper/res';
import Ionicons from '@expo/vector-icons/Ionicons';
import copyToClipBoard from '../helper/copyToClipBoard';
import { useState } from 'react';

function RenderCardComponent({ item }) {
    const { setCards } = useAuth();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index !== item.index));
        setShowConfirmDelete(false); // Close the modal after deletion
    }

    return (
        <View style={styles.container}>
            <Card item={item} />
            <View style={styles.menuBar}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                    onPress={() =>
                        copyToClipBoard(
                            item.card_number,
                            'Card Number Copied to Clipboard',
                        )
                    }
                >
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={calcHeight(4)}
                        color="blue"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                    onPress={() =>
                        copyToClipBoard(
                            item.card_number,
                            'Card Number Copied to Clipboard',
                        )
                    }
                >
                    <Ionicons name="eye" size={calcHeight(4)} color="blue" />
                </TouchableOpacity>
                
            </View>
            <Modal
                visible={showConfirmDelete}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Are you sure you want to delete this card?</Text>
                        <TouchableOpacity onPress={deleteCard}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowConfirmDelete(false)}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ({ item }) => <RenderCardComponent item={item} />;

const styles = StyleSheet.create({
    container: {
        marginTop: calcHeight(7),
        backgroundColor: '#A9A9A9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: calcWidth(2),
    },
    menuBar: {
        paddingHorizontal: calcHeight(1),
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});
