import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useState} from 'react';
import * as Notifications from 'expo-notifications';

function Card   ({ item }) {

    // const [remainingTime, setRemainingTime] = useState(60);

    
    return (<View style={styles.card}>
      <Text style={styles.cardText}>{item.nickname}</Text>
      <Text style={styles.cardText}>{item.card_number}</Text>
      <Text style={styles.cardText}>{item.expiry}</Text>
      <Text style={styles.cardText}>{item.cvv}</Text>
      <TouchableOpacity onPress={()=>Clipboard.setString(item.card_number)}>
      <Ionicons name="md-clipboard" size={32} color="green" />
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#5B0888', // Background color
      padding: 16,
      borderRadius: 10, // Rounded corners
      margin: 8,
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
  });

  export default Card;