import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import formatCardNumber from './formatCardNumber';

function Card({ item }) {
  return (
    <View style={{...styles.cardContainer,backgroundColor: (item.type && CARD_COLOR[item.type]) || item.color}}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>{item.nickname}</Text>
        <Image source={CARD_ICON[item.type]} style={styles.cardIcon} />
      </View>
      <Text style={styles.cardNumber}>{formatCardNumber(item.card_number)}</Text>
      <Text style={styles.cardText}>{item.expiry}</Text>
      {item.cvv && <Text style={styles.cardText}>{item.cvv}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
