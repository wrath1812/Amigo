import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

function TransactionFormScreen({ route }) {
  const { groupId } = route.params; // Get the group ID from the prop
  const [transactionData, setTransactionData] = useState({
    amount: '',
    description: '',
    paidBy: '', // You may want to pre-fill this with the user's ID
    group: groupId, // Use the received group ID
    splitAmong: [
      {
        user: '', // Initialize with empty user ID
        amount: '',
      },
      {
        user: '', // Initialize with empty user ID
        amount: '',
      },
    ],
    date: '',
  });

  const handleInputChange = (field, value) => {
    setTransactionData({
      ...transactionData,
      [field]: value,
    });
  };

  const handleSplitInputChange = (index, field, value) => {
    const updatedSplitAmong = [...transactionData.splitAmong];
    updatedSplitAmong[index][field] = value;

    setTransactionData({
      ...transactionData,
      splitAmong: updatedSplitAmong,
    });
  };

  const handleSubmit = () => {
    // Implement form submission logic here
    // Validate form data and send it to your API

    // For demonstration purposes, we'll just display the entered data in an alert
    Alert.alert('Transaction Data', JSON.stringify(transactionData, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('amount', text)}
        value={transactionData.amount}
        keyboardType="numeric"
      />

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('description', text)}
        value={transactionData.description}
      />

      <Text>Paid By:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('paidBy', text)}
        value={transactionData.paidBy}
      />

      <Text>Split Among:</Text>
      <View>
        {transactionData.splitAmong.map((split, index) => (
          <View key={index}>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                handleSplitInputChange(index, 'user', text)
              }
              value={split.user}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                handleSplitInputChange(index, 'amount', text)
              }
              value={split.amount}
              keyboardType="numeric"
            />
          </View>
        ))}
      </View>

      <Text>Date:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('date', text)}
        value={transactionData.date}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default TransactionFormScreen;
