import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import ViewShot from 'react-native-view-shot';

import CardMenu from './CardMenu';
import Card from './card';
import formatCardNumber from './formatCardNumber';
import CardHtml from '../components/CardHtml';
import CARD_COLOR from '../constants/cardColour';
import CARD_ICON from '../constants/cardIcon';
import MASK_COLORS from '../constants/maskColour';
import PAGES from '../constants/pages';
import { CARDS } from '../constants/string';
import { useAuth } from '../context/AuthContext';
import copyToClipBoard from '../helper/copyToClipBoard';
import getBase64FromFile from '../helper/getBase64FromFile';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

function CardBox({ item }) {
    const { setCards } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const navigation = useNavigation();
    const ref = useRef(null);

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index !== item.index));
        hideMenu();
    }

    const copyCardNumberToClipboard = () => {
        copyToClipBoard(item.card_number, 'Card Number Copied to Clipboard');
        hideMenu();
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const captureQrCode = async () => {
        if (ref.current) {
            try {
                // Capture the image
                const fileUri = await ref.current.capture();
                const base64String = await getBase64FromFile(fileUri);
                const imageUri = `data:image/jpg;base64,${base64String}`;
                return imageUri;
            } catch (error) {
                console.error('Error capturing QR code:', error);
            }
        }
    };
    const handleShare = async () => {
        alert(
            'Please ensure the safety of the file while sharing. You can also export the card securely in settings',
        );
        const imageUri = await captureQrCode();
        const html = CardHtml(item, imageUri);
        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        hideMenu();
    };

    return (
        <View style={styles.container}>
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

                <View style={{ marginVertical: calcHeight(2) }}>
                    {formatCardNumber(
                        item.card_number,
                        showCard,
                        MASK_COLORS[item.type],
                    )}
                </View>
                <View style={styles.cardDetailsContainer}>
                    <Text
                        style={{
                            ...styles.cardText,
                            textAlign: 'auto',
                            fontSize: getFontSizeByWindowWidth(12),
                            marginBottom: calcHeight(2),
                        }}
                    >
                        {item.name_on_card}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowCard((prev) => !prev)}
                    >
                        <Ionicons
                            name={showCard ? 'eye' : 'eye-off'}
                            size={calcHeight(4)}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardDetailsContainer}>
                    <View>
                        <Text style={styles.cardLabelText}>Valid Thru</Text>
                        <Text style={styles.cardText}>
                            {showCard ? item.expiry : null}
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
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <View
                            style={{
                                alignItems: 'flex-end',
                                marginTop: calcHeight(1),
                                marginRight: calcWidth(1),
                            }}
                        >
                            <Image
                                source={CARD_ICON[item.type]}
                                style={{
                                    width: calcWidth(15),
                                    height: calcHeight(5),
                                }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <CardMenu
                copyCardNumberToClipboard={copyCardNumberToClipboard}
                setShowEditCard={() => {
                    hideMenu();
                    navigation.navigate(PAGES.ADD_CARD, { item });
                }}
                setShowConfirmDelete={() => {
                    hideMenu();
                }}
                visible={showMenu}
                hideMenu={hideMenu}
                onDelete={deleteCard}
                onCancel={() => {
                    hideMenu();
                }}
                cardType={item.type}
                handleShare={handleShare}
            />

            <ViewShot
                options={{ format: 'jpg', quality: 0.9 }}
                ref={ref}
                style={{
                    backgroundColor: '#fff',
                    zIndex: -1,
                    position: 'absolute',
                    top: -1000,
                }}
            >
                <Card item={{ type: item.type }} />
            </ViewShot>
        </View>
    );
}

export default ({ item }) => <CardBox item={item} />;

const styles = StyleSheet.create({
    container: {
        marginBottom: calcHeight(7),
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
});
