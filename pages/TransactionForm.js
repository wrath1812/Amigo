import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Pressable,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import Loader from '../components/Loader';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import Categories from '../constants/Categories';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function TransactionFormScreen({ navigation, route: { params } }) {
    const { user } = useAuth();
    const [loading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [group, setGroup] = useState(
        params?.group || params?.selectedGroup || {},
    );
    const [transactionData, setTransactionData] = useState({
        amount: '',
        description: '',
        category: '',
        paidBy: user._id,
        date: new Date(),
        type: 'Other',
        splitAmong: [],
    });
    const descriptionRef = useRef();

    useEffect(() => {
        if (group && group.members) {
            const perUserPayment =
                transactionData.amount / group.members.length;
            setTransactionData((prev) => ({
                ...prev,
                splitAmong: group.members.map(({ _id }) => ({
                    amount: perUserPayment,
                    user: _id,
                })),
            }));
        }
    }, [transactionData.amount, group.members]);

    const handleInputChange = (field, value) => {
        setTransactionData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setTransactionData((prev) => ({
            ...prev,
            category: category,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            transactionData['amount'] = parseInt(transactionData.amount);
            const { data } = await apiHelper.post(
                '/transaction',
                transactionData,
            );
            Alert.alert('Success', JSON.stringify(data));
            navigation.navigate(PAGES.TRANSACTION, { group });
        } catch (error) {
            console.log('error', error);
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
                    onChangeText={(text) => handleInputChange('amount', text)}
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
                        onChangeText={(text) =>
                            handleInputChange('description', text)
                        }
                        value={transactionData.description}
                        placeholder="Description"
                        placeholderTextColor="#ccc"
                        ref={descriptionRef}
                        textAlign="center"
                    />
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginVertical: calcHeight(5),
                }}
            >
                {Categories.map((item, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.categoryItem,
                            selectedCategory === item.name &&
                                styles.selectedCategory,
                        ]}
                        onPress={() => handleCategorySelect(item.name)}
                    >
                        {item.icon}
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            {!params?.group && (
                <View>
                    <Pressable
                        style={{
                            backgroundColor: '#302B49',
                            padding: calcWidth(5),
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                        onPress={() => {
                            navigation.navigate(PAGES.SELECT_GROUP);
                        }}
                    >
                        <MaterialIcons
                            name="group-add"
                            style={{
                                marginRight: calcWidth(3),
                            }}
                            size={calcWidth(8)}
                            color="white"
                        />
                        <Text
                            style={{
                                color: 'white',
                            }}
                        >
                            Add Group
                        </Text>
                        <AntDesign
                            name="right"
                            size={calcWidth(5)}
                            color="white"
                            style={{
                                marginLeft: calcWidth(40),
                            }}
                        />
                    </Pressable>
                </View>
            )}
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <Button onPress={handleSubmit} title="Submit" />
            </View>
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
