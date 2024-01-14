import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import { useFocusEffect } from '@react-navigation/native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { useAuth } from '../context/AuthContext';
import { DatePickerModal } from 'react-native-paper-dates';
import typeIcon from '../assets/icons/type.png';
import ExpenseCard from '../components/ExpenseCard';

function ExpenseScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const { user } = useAuth();
    const [range, setRange] = React.useState({
        startDate: undefined,
        endDate: undefined,
    });
    const [type, setType] = useState(undefined);
    const [open, setOpen] = React.useState(false);

    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
        },
        [setOpen, setRange],
    );

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                try {
                    // Construct the filter object based on range and type
                    const filter = {
                        startDate: range.startDate,
                        endDate: range.endDate,
                        type,
                    };

                    const { data } = await apiHelper('/transaction/expenses', {
                        params: filter,
                    });

                    setTransactions(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [user.id, range]), // Include 'range' in the dependencies
    );
    if (loading) return <Loader />;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Expense Summary</Text>

            <View
                style={{
                    flexDirection:"row",
                    justifyContent: "space-around",
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#342F4F',
                        padding: calcWidth(1),
                        flexDirection: 'row',
                        
                    }}
                >
                    <Text
                        style={{
                            fontSize: getFontSizeByWindowWidth(15),
                            color:COLOR.TEXT
                        }}
                    >
                        Type
                    </Text>
                    <Image
                        style={{
                            height: calcHeight(1),
                            width: calcHeight(2),
                        }}
                        source={typeIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#342F4F',
                        padding: calcWidth(1),
                        flexDirection: 'row',
                    }}
                    onPress={() => setOpen(true)}
                >
                    <Text
                        style={{
                            fontSize: getFontSizeByWindowWidth(15),
                        }}
                    >
                        Date
                    </Text>
                </TouchableOpacity>
                <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onConfirm}
                />
            </View>

            {transactions.length === 0 ? (
                <Text style={styles.noTransactionsText}>
                    No Transactions Found
                </Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item }) => <ExpenseCard item={item} />}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

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
    }
});

export default ExpenseScreen;
