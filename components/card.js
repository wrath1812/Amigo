import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import MASK_COLORS from '../constants/maskColour';
import formatCardNumber from './formatCardNumber';

import { calcHeight, getFontSizeByWindowWidth, calcWidth } from '../helper/res';

function Card({ item }) {
    const [showCVV, setShowCVV] = useState(false);

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: CARD_COLOR[item.type] || item.color,
            }}
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
                <TouchableOpacity onPress={() => {/* Add your menu logic here */}}>
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={calcHeight(4)}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

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

            <View>
                {formatCardNumber(item.card_number, showCVV , MASK_COLORS[item.type])}
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
                        {item.expiry}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowCVV((prev) => !prev)}
                    >
                        <Ionicons
                            name={showCVV ? 'eye' : 'eye-off'}
                            size={calcHeight(4)}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.cardLabelText}>CVV</Text>
                        {item.cvv && (
                            <Text style={styles.cardText}>
                                {showCVV ? item.cvv : 'XXX'}
                            </Text>
                        )}
                    </View>
                    {!showCVV && (
                        <View style={styles.cvvMaskOverlay}>
                            <Text style={styles.cvvMaskText}>Tap to Reveal</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default Card;
