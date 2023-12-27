import React, { useEffect, useState, useRef } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    ScrollView, Alert, Pressable
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import Loader from '../components/Loader';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import Categories from '../constants/Categories';
import { calcWidth, getFontSizeByWindowWidth } from '../helper/res';

function TransactionFormScreen({ navigation, route: { params: { group } } }) {

    const { user } = useAuth();
    const [loading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [transactionData, setTransactionData] = useState({
        amount: '',
        description: '',
        category: '',
        paidBy: user._id,
        group: group._id,
        date: new Date(),
        type:"Other",
        splitAmong: []
    });
    const descriptionRef = useRef();

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

    const handleInputChange = (field, value) => {
        setTransactionData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setTransactionData(prev => ({
            ...prev,
            category: category
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            transactionData["amount"]=parseInt(transactionData);
            const { data } = await apiHelper.post('/transaction', transactionData);
            Alert.alert('Success', JSON.stringify(data));
            navigation.navigate(PAGES.TRANSACTION, { group });
        } catch (error) {
            Alert.alert('Error', 'There was an error saving the transaction.');
        }
        setIsLoading(false);
    };

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
                        textAlign='center'
                    />
                </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Categories.map((item, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.categoryItem,
                            selectedCategory === item.name && styles.selectedCategory
                        ]}
                        onPress={() => handleCategorySelect(item.name)}
                    >
                        {item.icon}
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Button onPress={handleSubmit} title="Submit" />
        </ScrollView>
    );
}

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
    },
    selectedCategory: {
        backgroundColor: '#ddd', // Highlight color for selected category
    },
});

export default TransactionFormScreen;
