import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { renderCard } from '../components/card';
import AddCard from '../components/addCard';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-native';
import { getLocalStoreData,setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { encryptData,decryptData } from '../helper/encryption';
function CardList() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { logout, encryptionKey } = useAuth();
    const [cards, setCards] = useState([]);

    const handleAddCard = async (newCard) => {
        const encryptedCard=encryptData(JSON.stringify(newCard), encryptionKey);
        const cards=await getLocalStoreData(CARDS);
        if (!cards || cards.length == 0) {
            await setLocalStoreData(CARDS, [encryptedCard]);
            hideModal();
            return;
        }
        const newCards = [...cards, encryptedCard];
        await setLocalStoreData(CARDS, newCards);
        hideModal();
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };
    useEffect(() => {

    const getCards = async () => {
        const encryptedCards=await getLocalStoreData(CARDS);
        if(!encryptedCards)
        return;
        const decryptedCards = encryptedCards.map((card) => {
            const decryptedCard=decryptData(card, encryptionKey);
            return decryptedCard;
        }

        );
        setCards(decryptedCards);
    }
    getCards();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {cards.length==0?
            <Text>No cards Added</Text>:
            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.card_number}
            />}
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
            <Button title="Logout" onPress={logout} />
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
