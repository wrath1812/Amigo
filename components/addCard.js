import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Card from './Card';

function AddCard({ onAddCard }) {
  const [card, setCard] = useState({
    nickname: "",
    card_number: "",
    expiry: "",
    cvv: "",
    color: "#000000",
  });

  const handleAddCard = () => {
    // Validate and process the card data
    if (card.nickname && card.card_number && card.expiry && card.cvv) {
      // Call the onAddCard function with the card data
      onAddCard(card);
      // Clear the form
      setCard({
        nickname: "",
        card_number: "",
        expiry: "",
        cvv: "",
      });
    }
  };

  return (
    <View>
      <Card item={card} />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default AddCard;