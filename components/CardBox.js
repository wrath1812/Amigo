import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { calcHeight, calcWidth } from '../helper/res';
import copyToClipBoard from '../helper/copyToClipBoard';
import Card from './card';
import DeleteCardModal from './DeleteCardModal';
import * as Menu from 'react-native-modal';

function CardBox({ item }) {
    const { setCards } = useAuth();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index !== item.index));
        setShowConfirmDelete(false); // Close the modal after deletion
    }

    const copyCardNumberToClipboard = () => {
        copyToClipBoard(item.card_number, 'Card Number Copied to Clipboard');
    };

    const hideMenu = () => {
        setShowMenu(false);
    }

    return (
        <View style={styles.container}>
            <Card item={item} />
            <View style={styles.menuBar}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center' }}
                    onPress={()=>setShowMenu(true)}
                >
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={calcHeight(4)}
                        color="blue"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center' }}
                    onPress={() => setShowConfirmDelete(true)}
                >
                    <Ionicons name="eye" size={calcHeight(4)} color="blue" />
                </TouchableOpacity>
            </View>
            <Modal
                visible={showConfirmDelete}
                transparent={true}
                animationType="slide"
            >
                <DeleteCardModal onDelete={deleteCard} onCancel={() => setShowConfirmDelete(false)} />
            </Modal>
            <Modal
                visible={showMenu}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={hideMenu}
                onBackButtonPress={hideMenu}
                propagateSwipe={true}
                swipeDirection={['down']}
                onSwipeComplete={hideMenu}
            >
                <View>
                    <Text>Menu</Text>
                </View>
            </Modal>
        </View>
    );
}

export default ({ item }) => <CardBox item={item} />;

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
    }
});
