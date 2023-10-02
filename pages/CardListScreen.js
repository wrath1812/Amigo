import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import RenderCard from '../components/RenderCard';
import AddCard from '../components/addCard';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useAuth } from '../context/AuthContext';
import AddCardBox from '../components/AddCardBox';
import { encryptData, decryptData } from '../helper/encryption';
import Loader from '../components/Loader';
function CardList() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { encryptionKey, loading, cards } = useAuth();

    const handleAddCard = async (newCard) => {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].card_number == newCard.card_number) {
                alert('Card already exists');
                return;
            }
        }
        const encryptedCard = encryptData(
            JSON.stringify(newCard),
            encryptionKey,
        );
        const savedCards = await getLocalStoreData(CARDS);
        if (!savedCards || savedCards.length == 0) {
            await setLocalStoreData(CARDS, [encryptedCard]);
            setCards((prev) => [newCard, ...prev]);
            hideModal();
            return;
        }
        const newCards = [...savedCards, encryptedCard];
        await setLocalStoreData(CARDS, newCards);
        hideModal();
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return loading ? (
        <Loader />
    ) : (
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
