import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';
import apiHelper from "../helper/apiHelper";
import Loader from '../components/Loader';

function TransactionScreen({ route: { params: { id } } }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await apiHelper(`/group/${id}/transactions`);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) {
    return <Loader />; // Your Loader component to indicate loading state
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {transactions.map(transaction => (
          <View key={transaction._id} style={styles.transactionCard}>
            <Text style={styles.description}>{transaction.description}</Text>
            <Text>Amount: ${transaction.amount}</Text>
            <Text>Date: {new Date(transaction.date).toLocaleDateString()}</Text>
            <View>
              <Text>Split among:</Text>
              {transaction.splitAmong.map(person => (
                <Text key={person._id}>
                  User: {person.user} - Amount: ${person.amount}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  transactionCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // ...other styles you may need
});

export default TransactionScreen;
