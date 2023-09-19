import { View, Text, StyleSheet } from 'react-native';
const Card  = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Nickname: {item.nickname}</Text>
      <Text style={styles.cardText}>Card Number: {item.card_number}</Text>
      <Text style={styles.cardText}>Expiry: {item.expiry}</Text>
      <Text style={styles.cardText}>CVV: {item.cvv}</Text>
    </View>
  );

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
    },
    cardText: {
      color: 'white', // Text color
      fontSize: 16,
    },
  });

  export default Card;