import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import MASK_COLORS from '../constants/maskColour';

import { calcHeight, getFontSizeByWindowWidth, calcWidth } from '../helper/res';

function formatCardNumber(cardNumber, showCard, maskColor) {
    if (!cardNumber) return null;
    const formattedNumber = cardNumber.replace(/\s/g, ''); // Remove spaces
    const numBoxes = Math.ceil(formattedNumber.length / 4); // Calculate the number of boxes needed
    const boxes = [];

    for (let i = 0; i < numBoxes; i++) {
        const start = i * 4;
        const end = start + 4;
        const box = formattedNumber.slice(start, end);
        boxes.push(
            <View key={i} style={{...styles.cardNumberBoxContainer,marginLeft:i==0?0:calcWidth(3)}}>
                {showCard || i >= numBoxes - 1 ? (
                    <Text style={styles.cardNumberBox}>{box}</Text>
                ) : (
                    <View style={{ ...styles.cardMask, backgroundColor: maskColor }}></View>
                )}
            </View>,
        );
    }

    return <View style={styles.cardNumberContainer}>{boxes}</View>;
}

function Card({ item, showCard }) {
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
                <Image
                    source={CARD_ICON[item.type]}
                    style={{ width: calcWidth(15), height: calcHeight(5) }}
                />
            </View>
            <View style={styles.cardNumber}>
                {formatCardNumber(item.card_number, showCard, MASK_COLORS[item.type])}
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
                        {showCard ? (
                            item.expiry
                        ) : (
                            <View
                                style={{
                                    ...styles.validityMask,
                                    backgroundColor: MASK_COLORS[item.type],
                                }}
                            ></View>
                        )}
                    </Text>
                </View>
                <View>
                    <Text style={styles.cardLabelText}>CVV</Text>
                    {showCard ? (
                        item.cvv && (
                            <Text style={styles.cardText}>{item.cvv}</Text>
                        )
                    ) : (
                        <View
                            style={{
                                ...styles.cvvMask,
                                backgroundColor: MASK_COLORS[item.type],
                            }}
                        ></View>
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
        height: calcHeight(25),
        width: calcWidth(75),
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
    cardNumberContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardNumberBoxContainer: {
        alignItems: 'center',
    },
    cardNumberBox: {
        color: 'white',
        fontSize: (calcWidth(75) - calcWidth(6)) / 16, // Dynamically calculate font size
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        width: calcWidth(10),
        textAlign: 'center',
    },
    cardMask: {
        width: calcWidth(10),
        height: calcHeight(2),
    },
    validityMask: {
        width: calcWidth(10),
        height: calcHeight(1.5),
        marginTop: calcHeight(3),
    },
    cvvMask: {
        width: calcWidth(5),
        height: calcHeight(1.5),
    },
});

export default Card;
