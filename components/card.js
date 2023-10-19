import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import formatCardNumber from './formatCardNumber';
import { calcHeight, calcWidth } from '../helper/res';

function Card({ item }) {
    return (
        <View
            style={{
                ...styles.cardContainer,
                backgroundColor:
                    (item.type && CARD_COLOR[item.type]) || item.color,
            }}
        >
            <Text
                style={{
                    paddingBottom: calcWidth(5),
                    ...styles.cardHeaderText,
                }}
            >
                {item.nickname}
            </Text>
                {formatCardNumber(item.card_number)}
            <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>{item.name_on_card}</Text>
            </View>
            <View style={styles.cardHeader}>
                <Text style={styles.cardText}>{item.expiry}</Text>
                {item.cvv && <Text style={styles.cardText}>{item.cvv}</Text>}
                <Image source={CARD_ICON[item.type]} style={styles.cardIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: calcHeight(3),
        borderRadius: calcHeight(2),
        margin: calcHeight(1),
        elevation: 3,
        width: calcWidth(90),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: calcHeight(1),
    },
    cardHeaderText: {
        color: 'white',
        fontSize: 18,
    },
    cardIcon: {
        width: 50,
        height: 50,
    },
    cardNumber: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        marginVertical: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Card;
