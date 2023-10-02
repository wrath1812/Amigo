import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import RenderCard from '../components/RenderCard';
import AddCard from '../components/addCard';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useAuth } from '../context/AuthContext';
import AddCardBox from '../components/AddCardBox';
import { encryptData } from '../helper/encryption';
import { CARDS } from '../constants/string';
import getEncryptionKey from '../util/getEncryptionKey';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
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
                        renderItem={RenderCard}
                        keyExtractor={(item) => item.card_number}
                    />
                )
            ) : (
                <Loader />
            )}
            <View style={styles.fabContainer}>
                <FAB style={styles.fab} icon="plus" onPress={showModal} />
            </View>
            <Modal
                isVisible={isModalVisible}
                style={styles.modal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={hideModal}
                onBackButtonPress={hideModal}
                propagateSwipe={true}
                swipeDirection={['down']}
                onSwipeComplete={hideModal}
            >
                <View style={styles.modalContent}>
                    <AddCard onAddCard={handleAddCard} />
                </View>
            </Modal>
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
        bottom: 16,
        right: 16,
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
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        marginTop: 20,
        width: '100%',
    },
    inputField: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 12,
        padding: 12,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expiryField: {
        flex: 1,
        marginRight: 10,
    },
    cvvField: {
        flex: 1,
    },
    addButton: {
        backgroundColor: 'blue', // Button background color
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CardList;
