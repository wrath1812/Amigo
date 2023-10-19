import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text,Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import copyToClipBoard from '../helper/copyToClipBoard';
import DeleteCardModal from './DeleteCardModal';
import Modal from 'react-native-modal';
import AddCardModal from './AddCardModal';
import CardMenu from './CardMenu';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import MASK_COLORS from '../constants/maskColour';
import formatCardNumber from './formatCardNumber';

import getEncryptionKey from '../util/getEncryptionKey';
import { encryptData } from '../helper/encryption';

function CardBox({ item }) {
    const { cards, setCards } = useAuth();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showEditCard, setShowEditCard] = useState(false);
    const [showCard, setShowCard] = useState(false);

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index !== item.index));
        setShowConfirmDelete(false); // Close the modal after deletion
        hideMenu();
    }

    const copyCardNumberToClipboard = () => {
        copyToClipBoard(item.card_number, 'Card Number Copied to Clipboard');
        hideMenu();
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const encryptCard = (newCard, encryptionKey) => {
        return encryptData(JSON.stringify(newCard), encryptionKey);
    };

    const updateCardStorage = async (newCards) => {
        await setLocalStoreData(CARDS, newCards);
    };

    const handleEditCard = async (editedCard, index) => {
        try {
            // Check if the card already exists
            if (!cards || index < 0 || index >= cards.length) {
                alert('Invalid index or card does not exist');
                return;
            }

            const encryptionKey = await getEncryptionKey();
            const encryptedCard = encryptCard(editedCard, encryptionKey);
            const encryptCards = await getLocalStoreData(CARDS);

            encryptCards[index] = encryptedCard;

            await updateCardStorage(encryptCards);

            const updatedCards = [...cards];
            updatedCards[index] = { ...editedCard };

            setCards(updatedCards);
            setShowEditCard(false);
            setShowMenu(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Render the Card component directly with the showCard prop */}
            <TouchableOpacity
            style={{
                ...styles.card,
                backgroundColor: CARD_COLOR[item.type] || item.color,
            }}
            onPress={copyCardNumberToClipboard}
            onLongPress={() => setShowMenu(true)}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        ...styles.cardText,
                        textAlign: 'auto',
                        fontSize: getFontSizeByWindowWidth(12),
                        fontWeight: 'bold',
                    }}
                >
                    {item.nickname}
                </Text>
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={calcHeight(4)}
                        color="black"
                    />
                </TouchableOpacity>
            </View>


            <View>
                {formatCardNumber(item.card_number, showCard , MASK_COLORS[item.type])}
            </View>

            <Text
                style={{
                    ...styles.cardText,
                    textAlign: 'auto',
                    fontSize: getFontSizeByWindowWidth(12),
                }}
            >
                {item.name_on_card}
            </Text>

            <View style={styles.cardDetailsContainer}>
                <View>
                    <Text style={styles.cardLabelText}>Valid Thru</Text>
                    <Text style={styles.cardText}>
                        {showCard?item.expiry:null}
                    </Text>
                </View>
                <View>
                        <Text style={styles.cardLabelText}>CVV</Text>
                        {item.cvv && (
                            <Text style={styles.cardText}>
                                {showCard ? item.cvv : null}
                            </Text>
                        )}
                    </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowCard((prev) => !prev)}
                    >
                        <Ionicons
                            name={showCard ? 'eye' : 'eye-off'}
                            size={calcHeight(4)}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                alignItems: 'flex-end',
                marginTop: calcHeight(1),
                marginRight: calcWidth(1),
            }}>
                <Image
                    source={CARD_ICON[item.type]}
                    style={{ width: calcWidth(15), height: calcHeight(5) }}
                />
            </View>
                </View>
            </View>
        </TouchableOpacity>

            <DeleteCardModal
                onDelete={deleteCard}
                onCancel={() => {
                    setShowConfirmDelete(false);
                    hideMenu();
                }}
                visible={showConfirmDelete}
            />
            <Modal
                isVisible={showMenu}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={hideMenu}
                onBackButtonPress={hideMenu}
                propagateSwipe={true}
                swipeDirection={['down']}
                onSwipeComplete={hideMenu}
                style={styles.modal}
            >
                <CardMenu
                    copyCardNumberToClipboard={copyCardNumberToClipboard}
                    setShowEditCard={() => setShowEditCard(true)}
                    setShowConfirmDelete={() => setShowConfirmDelete(true)}
                />
            </Modal>
            <AddCardModal
                onAddCard={(editedCard) =>
                    handleEditCard(editedCard, item.index)
                }
                visible={showEditCard}
                hideModal={() => setShowEditCard(false)}
                cardData={item}
            />
        </View>
    );
}

export default ({ item }) => <CardBox item={item} />;

const styles = StyleSheet.create({
    container: {
        marginTop: calcHeight(7),
    },
    buttonBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: calcHeight(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    card: {
        padding: calcHeight(3),
        borderRadius: calcHeight(2),
        margin: calcHeight(1),
        elevation: 3,
        width: calcWidth(90),
    },
    cardText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(10),
        textAlign: 'center',
    },
    cardDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: calcHeight(1),
    },
    cardLabelText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(8),
        opacity: 0.6,
    },
    cvvMaskOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cvvMaskText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(12),
    },
    button: {
        zIndex: 1,
        position: 'absolute',
        left: 0,
    },
});
