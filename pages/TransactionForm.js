// Import necessary modules from React and React Native
import React, { useEffect, useState, useRef } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    ScrollView, Alert, Pressable
} from 'react-native';

// Import custom components and helpers
import { useAuth } from '../context/AuthContext';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import Loader from '../components/Loader';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import Categories from '../constants/Categories';
import { calcWidth, getFontSizeByWindowWidth } from '../helper/res';

// TransactionFormScreen component definition
function TransactionFormScreen({ navigation, route: { params: { group } } }) {
    // State and context hooks
    const { user } = useAuth();
    const [loading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState({
        amount: '',
        description: '',
        paidBy: user._id,
        group: group._id,
        date: new Date(),
        splitAmong: []
    });
    const descriptionRef = useRef();

    // Effect for updating split amounts
    useEffect(() => {
        const perUserPayment = transactionData.amount / group.members.length;
        setTransactionData(prev => ({
            ...prev,
            splitAmong: group.members.map(({ _id }) => ({
                amount: perUserPayment,
                user: _id
            }))
        }));
    }, [transactionData.amount, group.members]);

    // Handlers
    const handleInputChange = (field, value) => {
        setTransactionData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper.post('/transaction', transactionData);
            Alert.alert('Success', 'Transaction saved successfully.');
            navigation.navigate(PAGES.TRANSACTION, { group });
        } catch (error) {
            Alert.alert('Error', 'There was an error saving the transaction.');
        }
        setIsLoading(false);
    };

    // Component render
    return loading ? (
        <Loader />
    ) : (
        <ScrollView style={styles.container}>
            <View style={styles.rowCentered}>
                <Text style={styles.amount}>$</Text>
                <TextInput
                    style={styles.amount}
                    onChangeText={text => handleInputChange('amount', text)}
                    value={transactionData.amount}
                    keyboardType="numeric"
                    placeholderTextColor={COLOR.TEXT}
                    placeholder="0"
                    autoFocus
                />
            </View>

            <View style={styles.rowCentered}>
                <Pressable
                    style={styles.descriptionContainer}
                    onPress={() => descriptionRef.current.focus()}
                >
                    <TextInput
                        style={styles.description}
                        onChangeText={text => handleInputChange('description', text)}
                        value={transactionData.description}
                        placeholder="Description"
                        placeholderTextColor="#ccc"
                        ref={descriptionRef}
                    />
                </Pressable>
            </View>

            <ScrollView horizontal>
                {Categories.map((item, index) => (
                    <Pressable key={index} style={styles.categoryItem}>
                        {item.icon}
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Button onPress={handleSubmit} title="Submit" />
        </ScrollView>
    );
}

// Styles definition
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: calcWidth(5),
        backgroundColor: COLOR.APP_BACKGROUND,
        alignContent: 'center',
    },
    rowCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    amount: {
        alignItems: 'center',
        alignContent: 'center',
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(50),
    },
    description: {
        flex: 1,
        color: 'white',
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: calcWidth(3),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: calcWidth(30),
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: calcWidth(3),
    },
    categoryText: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(8),
        paddingLeft: calcWidth(1),
    }
});

// Export the component
export default TransactionFormScreen;
