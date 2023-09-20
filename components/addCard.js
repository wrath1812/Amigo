import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Card from './Card';
import * as CardValidator from 'card-validator';

function AddCard({ onAddCard }) {
  const [card, setCard] = useState({
    nickname: '',
    card_number: '',
    expiry: '',
    cvv: '',
    color: '#000000',
  });
  const [cardType, setCardType] = useState('');

  // Function to format the card number with spaces every four digits
  const formatCardNumber = (input) => {
    const formattedInput = input.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCard({ ...card, card_number: formattedInput });

    // Validate the card number in real-time
    const cardNumberValidation = CardValidator.number(formattedInput);
    setIsCardNumberValid(cardNumberValidation.isValid);
    setCardType(cardNumberValidation.card ? cardNumberValidation.card.type : '');
  };

  // Function to validate the CVV
  const validateCVV = (cvv) => {
    const cvvValidation = CardValidator.cvv(cvv, cardType);
    setIsCVVValid(cvvValidation.isValid);
  };

  const handleAddCard = () => {
    // Validate and process the card data
    if (card.nickname && isCardNumberValid && card.expiry && isCVVValid) {
      // Call the onAddCard function with the card data
      onAddCard(card);
      // Clear the form
      setCard({
        nickname: '',
        card_number: '',
        expiry: '',
        cvv: '',
      });
    }
  };

  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isCVVValid, setIsCVVValid] = useState(true);

  return (
    <ScrollView>
      <Card item={card} />
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={card.nickname}
        onChangeText={(text) => setCard({ ...card, nickname: text })}
      />
      <TextInput
        style={[styles.input, !isCardNumberValid && styles.invalidInput]}
        placeholder="Card Number"
        keyboardType="numeric"
        value={card.card_number}
        onChangeText={formatCardNumber}
        maxLength={19}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.input}
          placeholder="Expiry Date"
          value={card.expiry}
          onChangeText={(text) => setCard({ ...card, expiry: text })}
        />
        <TextInput
          style={[styles.input, !isCVVValid && styles.invalidInput]}
          placeholder="CVV"
          keyboardType="numeric"
          value={card.cvv}
          onChangeText={(text) => {
            setCard({ ...card, cvv: text });
            // Validate the CVV in real-time
            validateCVV(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  invalidInput: {
    borderColor: 'red', // Change border color for invalid input
  },
  addButton: {
    backgroundColor: 'blue',
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

export default AddCard;
