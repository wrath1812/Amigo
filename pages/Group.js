import React, { useEffect, useState, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Pressable,
} from 'react-native';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import { calcWidth, calcHeight } from '../helper/res';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import {useAuth} from "../context/AuthContext";

function TransactionScreen({
    navigation,
    route: {
        params: { group },
    },
}) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [balances,setBalances]=useState([]);
    const {user}=useAuth();

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper(`/group/${group._id}/transactions`);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        setIsLoading(false);
    }, [group]);


    const fetchBalances= useCallback(async () => {
        try {
            const { data } = await apiHelper(`/balance/${group._id}`);
            setBalances(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [group]);

    useFocusEffect(fetchTransactions);
    useFocusEffect(fetchBalances);

    if (isLoading) {
        return <Loader />; // Your Loader component to indicate loading state
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
{
    balances && balances.length > 0 && balances.map((balance) => {
        const isLender = user._id === balance.lender._id;
        const isBorrower = user._id === balance.borrower._id;

        const lenderName = isLender ? "You" : balance.lender.name;
        const borrowerName = isBorrower ? "You" : balance.borrower.name;
        const amountOwed = balance.amount;

        return (
            <Text>
                {`${borrowerName} owe ${lenderName} ${amountOwed}`}
            </Text>
        );
    })
}

                {transactions.map((transaction) => (
                    <Pressable
                        key={transaction._id}
                        style={styles.transactionCard}
                    >
                        <Text style={styles.description}>
                            {transaction.description}
                        </Text>
                        <Text>Amount: ${transaction.amount}</Text>
                        <Text>
                            Date:{' '}
                            {new Date(transaction.date).toLocaleDateString()}
                        </Text>
                        <Text>Paid By {transaction.paidBy.name}</Text>
                        <View>
                            <Text>Split among:</Text>
                            {transaction.splitAmong.map((person) => (
                                <Text key={person.user._id}>
                                    User: {person.user.name} - Amount: $
                                    {person.amount}
                                </Text>
                            ))}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
            <FabIcon
                onPress={() =>
                    navigation.navigate(PAGES.ADD_TRANSACTION, { group })
                }
            />
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
});

export default TransactionScreen;
