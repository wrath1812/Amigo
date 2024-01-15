import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../hooks/useExpense'; // Custom hook for fetching transactions
import ExpenseCard from '../components/ExpenseCard';
import DatePickerSelector from '../components/DatePickerSelector'; // Separate component for date picker
import TypeSelector from '../components/TypeSelector'; // Separate component for type selector
import Loader from '../components/Loader';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

function ExpenseScreen() {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { expense, range, setRange, type, setType, open, setOpen } =
        useExpense(user.id, setLoading);

    if (loading) return <Loader />;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Expense Summary</Text>

            <View style={styles.selectorContainer}>
                <TypeSelector setType={setType} />
                <DatePickerSelector
                    range={range}
                    setRange={setRange}
                    open={open}
                    setOpen={setOpen}
                />
            </View>

            {expense.length === 0 ? (
                <Text style={styles.noTransactionsText}>
                    No Transactions Found
                </Text>
            ) : (
                <FlatList
                    data={expense}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item }) => <ExpenseCard item={item} />}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

export default ExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        margin: calcHeight(3),
    },
    selectorContainer: {
        flexDirection: 'row',
        gap: calcWidth(8),
        margin: calcWidth(5),
        alignItems: 'center',
    },
    noTransactionsText: {
        fontSize: getFontSizeByWindowWidth(15),
        color: COLOR.TEXT,
        textAlign: 'center',
        marginTop: 20,
    },
    list: {
        // Add styles for your FlatList if needed
    },
    // Add other styles that you might have used in your component
});
