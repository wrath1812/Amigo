import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import cardData from '../data';
import { renderCard } from '../components/card';
import AddCard from '../components/addCard';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-native';

function CardList() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { logout } = useAuth();
    const handleAddCard = (newCard) => {
        // Add the new card to your cardData or perform any other necessary action
        console.log('Adding new card:', newCard);
        // Close the modal
        hideModal();
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cardData}
                renderItem={renderCard}
                keyExtractor={(item) => item.card_number}
            />
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
