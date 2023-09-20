import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import CARD_ICON from '../contants/cardIcon';
import CARD_COLOR from '../contants/cardColour';
import Toast from 'react-native-root-toast';




function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(.{4})/g, '$1    ');
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
  console.log(item.type);

  return (
    <View style={{ ...styles.card, backgroundColor: CARD_COLOR[item.type] || item.color}}>
      <View  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.cardText}>{item.nickname}</Text>
      <Image source={CARD_ICON[item.type] } style={{ width: 50, height: 50 }} />
      </View>
      <Text style={styles.cardNumber}>{getCardNumberDisplayValue(item.card_number,!showCVV)}</Text>
      <Text style={styles.cardText}>{item.expiry}</Text>
      <View style={styles.cvvContainer}>
       {item.cvv&&( <Text style={styles.cardText}>{showCVV?item.cvv:"XXX"}</Text>)}
        {item.card_number&&(<TouchableOpacity onPress={handleClipboardPress}>
          <Ionicons name="md-clipboard" size={32} color="gray" />
        </TouchableOpacity>)}
        <View>
        {item.cvv && (<TouchableOpacity onPress={() => setShowCVV((prev) => !prev)}>
        <Ionicons
          name={showCVV ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>)}
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
    fontSize: 17, // Adjust the font size as needed for the card number
    margin: 5, 
    fontWeight: 'bold',
    // horizontally center
    textAlign: 'center',
    // add shadow to the bottom
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
}); 

export const  renderCard = ({ item }) => <Card item={item} />;

export default Card;