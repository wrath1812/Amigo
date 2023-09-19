import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import Amex from '../cardIcon/amex.png';
import MasterCard from '../cardIcon/masterCard.png';
import Visa from '../cardIcon/visa.png';
import Toast from 'react-native-root-toast';


const icon={
  MasterCard,
  Visa,
  Amex
};

function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(.{4})/g, '$1 ');
}

function maskCardNumber(cardNumber) {
  const visibleDigits = 4;
  const maskedSection = cardNumber.slice(0, -visibleDigits);
  const visibleSection = cardNumber.slice(-visibleDigits);
  return maskedSection.replace(/./g, '*') + visibleSection;
}

function getCardNumberDisplayValue(cardNumber, showFullNumber) {
  if (!showFullNumber) 
   cardNumber = maskCardNumber(cardNumber);
  
  return formatCardNumber(cardNumber);
}
function Card({ item }) {
  const [showCVV, setShowCVV] = useState(false);

  const handleClipboardPress = async () => {
    Clipboard.setString(item.card_number);
    Toast.show('Card Number Copied to Clipboard', {
      duration: Toast.durations.LONG,
  });

  };

  return (
    <View style={{ ...styles.card, backgroundColor: item.color }}>
      <View  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.cardText}>{item.nickname}</Text>
      <Image source={icon[item.type] } style={{ width: 50, height: 50 }} />
      </View>
      <Text style={styles.cardNumber}>{getCardNumberDisplayValue(item.card_number,!showCVV)}</Text>
      <Text style={styles.cardText}>{item.expiry}</Text>
      <View style={styles.cvvContainer}>
        <Text style={styles.cardText}>{showCVV?item.cvv:"XXX"}</Text>
        <TouchableOpacity onPress={handleClipboardPress}>
          <Ionicons name="md-clipboard" size={32} color="green" />
        </TouchableOpacity>
        <View>
        <Switch
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          trackColor={{ false: 'gray', true: 'green' }} // Customize track color
          thumbColor={showCVV ? 'green' : 'gray'} // Customize thumb color
          value={showCVV}
          onValueChange={() => setShowCVV((prev) => !prev)}
        />
        <Text style={{...styles.cardText,fontSize:10}}>{showCVV?"Hide":"Show"} CVV</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10, // Rounded corners
    margin: 20,
    elevation: 3, // Shadow for Android
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    height: 200,
    width: 300,
  },
  cardText: {
    color: 'white', // Text color
    fontSize: 16,
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNumber: {
    color: 'white',
    fontSize: 20, // Adjust the font size as needed for the card number
    margin: 5, 
    fontWeight: 'bold',
    // horizontally center
    textAlign: 'center',
    // add shadow to the bottom
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
}); 

const  renderItems = ({ item }) => <Card item={item} />;

export default renderItems;