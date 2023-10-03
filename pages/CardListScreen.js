import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import CardBox from '../components/CardBox';
import AddCardModal from '../components/AddCardModal';
import { FAB } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import AddCardBox from '../components/AddCardBox';
import { encryptData } from '../helper/encryption';
import { CARDS } from '../constants/string';
import getEncryptionKey from '../util/getEncryptionKey';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
function CardList() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { cards, setCards } = useAuth();

    const handleAddCard = async (newCard) => {
        try {
            // Check if the card already exists
            if (cardExists(newCard)) {
                alert('Card already exists');
                return;
            }

            const encryptionKey = await getEncryptionKey();
            const encryptedCard = encryptCard(newCard, encryptionKey);
            const savedCards = await getLocalStoreData(CARDS);

            if (!savedCards || savedCards.length === 0) {
                await initializeCardStorage([encryptedCard]);
            } else {
                await updateCardStorage([...savedCards, encryptedCard]);
            }

            updateCards(newCard);
            hideModal();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const cardExists = (newCard) => {
        return cards.some((card) => card.card_number === newCard.card_number);
    };

    const encryptCard = (newCard, encryptionKey) => {
        return encryptData(JSON.stringify(newCard), encryptionKey);
    };

    const initializeCardStorage = async (newCards) => {
        await setLocalStoreData(CARDS, newCards);
    };

    const updateCardStorage = async (newCards) => {
        await setLocalStoreData(CARDS, newCards);
    };

    const updateCards = (newCard) => {
        setCards((prev) => [{ index: prev.length, ...newCard }, ...prev]);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView
            style={{ ...styles.container, backgroundColor: '#1a1a1a' }}
        >
            {cards ? (
                cards.length == 0 ? (
                    <AddCardBox showModal={showModal} />
                ) : (
                    <FlatList
                        data={cards}
                        renderItem={CardBox}
                        keyExtractor={(item) => item.card_number}
                    />
                )
            ) : (
                <Loader />
            )}
            <View style={styles.fabContainer}>
                <FAB style={styles.fab} icon="plus" onPress={showModal} />
            </View>
            <AddCardModal
                onAddCard={handleAddCard}
                visible={isModalVisible}
                hideModal={hideModal}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5), // 5% of the device height
        right: calcWidth(5), // 5% of the device width
    },
    fab: {
        backgroundColor: 'white',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: calcHeight(2), // 2% of the device height
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inputContainer: {
        marginTop: calcHeight(2), // 2% of the device height
        width: '100%',
    },
    inputField: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: calcHeight(1.5), // 1.5% of the device height
        padding: calcHeight(1.5), // 1.5% of the device height
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expiryField: {
        flex: 1,
        marginRight: calcWidth(2), // 2% of the device width
    },
    cvvField: {
        flex: 1,
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: calcHeight(1.5), // 1.5% of the device height
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(16), // Font size based on device width
        fontWeight: 'bold',
    },
});

export default CardList;
