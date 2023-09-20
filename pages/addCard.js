import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Card from '../components/card';
function AddCard() {
  const [card, setCard] = useState({
    "nickname": "",
    "card_number": "",
    "expiry": "",
    "cvv": "",
    "color": "blue",
    "type": ""
  });

  return (
    <View style={styles.container}>
        <Card item={card}/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Nickname"
          value={card.nickname}
          onChangeText={text => setCard({ ...card, nickname: text })}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Card Number"
          value={card.card_number}
          onChangeText={text => setCard({ ...card, card_number: text })}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.inputField, styles.expiryField]}
            placeholder="Expiry Date"
            value={card.expiry}
            onChangeText={text => setCard({ ...card, expiry: text })}
          />
          <TextInput
            style={[styles.inputField, styles.cvvField]}
            placeholder="CVV"
            value={card.cvv}
            onChangeText={text => setCard({ ...card, cvv: text })}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputField: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryField: {
    flex: 1,
    marginRight: 10,
  },
  cvvField: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'blue', // Button background color
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
