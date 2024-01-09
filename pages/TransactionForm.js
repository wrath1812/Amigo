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

import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import Loader from '../components/Loader';
import COLOR from '../constants/Colors';
import Button from '../components/Button';
import Categories from '../constants/Categories';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useTransaction } from '../context/TransactionContext';
import getPreviousPageName from '../helper/getPreviousPageName';
import { useAuth } from '../context/AuthContext';
function TransactionFormScreen({ navigation }) {
    const [loading, setIsLoading] = useState(false);
    const {
        transactionData,
        setTransactionData,
        resetTransaction,
        upiParams,
        setUpiParams,
    } = useTransaction();
    const descriptionRef = useRef();
    const {user}=useAuth();
    useEffect(() => {
        const { group } = transactionData;
        if (group && group.members) {
            const totalMembers = group.members.length;
            const perUserPayment = Math.floor(
                transactionData.amount / totalMembers,
            );
            const remainder = transactionData.amount % totalMembers;

            setTransactionData((prev) => ({
                ...prev,
                splitAmong: group.members.map((user, index) => ({
                    amount: perUserPayment + (index < remainder ? 1 : 0),
                    user,
                    paidBy: { _id: user?._id, name: 'You' },
                })),
            }));
        }
    }, [transactionData.amount, transactionData.group]);

    useEffect(() => {
        setTransactionData((prev) => ({
            ...prev,
            paidBy: { _id: user?._id, name: 'You' },
        }));
    }, [transactionData.group]);

    useEffect(() => {
        if (getPreviousPageName(navigation) == PAGES.TAB_NAVIGATOR)
            resetTransaction();
        else if (getPreviousPageName(navigation) == PAGES.SCANNER) {
            if (upiParams.am)
                setTransactionData((prev) => ({
                    ...prev,
                    amount: upiParams.am||"",
                    description:""
                }));
        }
    }, []);

    const handleInputChange = (field, value) => {
        setTransactionData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCategorySelect = (category) => {
        setTransactionData((prev) => ({
            ...prev,
            type: category,
        }));
    };

    const handleSubmit = async () => {
        if (
            !(
                transactionData.amount &&
                transactionData.description &&
                transactionData.group
            )
        ) {
            alert('All fiends are required');
            return;
        }
        setIsLoading(true);
        try {
            // Create a new object with modifications, leaving original transactionData unchanged
            const modifiedTransactionData = {
                ...transactionData,
                amount: parseInt(transactionData.amount),
                group: transactionData.group._id,
                paidBy: transactionData.paidBy._id,
                splitAmong: transactionData.splitAmong.map((user) => ({
                    amount: user.amount,
                    user: user.user._id || user.user.id,
                })),
            };

            const { data } = await apiHelper.post(
                '/transaction',
                modifiedTransactionData,
            );

            if (upiParams.receiverId) {
                setUpiParams((prev) => ({
                    ...prev,
                    am: modifiedTransactionData.amount,
                }));
                navigation.navigate(PAGES.UPI_APP_SELECTION);
                return;
            }
            Alert.alert('Success', JSON.stringify(data));
            navigation.goBack();
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
                <Text style={styles.amount}>₹</Text>
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
                            transactionData.type === item.name &&
                                styles.selectedCategory,
                        ]}
                        onPress={() => handleCategorySelect(item.name)}
                    >
                        {item.icon}
                        <Text
                            style={[
                                styles.categoryText,
                                transactionData.type === item.name && {
                                    color: 'black',
                                },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
            {getPreviousPageName(navigation) != PAGES.GROUP && (
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
                            {transactionData.group?.name || 'Add Group'}
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
            {transactionData.group?.members?.length > 0 && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor: '#302B49',
                            padding: calcWidth(5),
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginTop: calcHeight(5),
                            width: calcWidth(40),
                        }}
                        onPress={() => {
                            navigation.navigate(PAGES.SELECT_PAID_BY);
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                            }}
                        >
                            Paid By {transactionData.paidBy?.name}
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: '#302B49',
                            padding: calcWidth(5),
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginTop: calcHeight(5),
                            width: calcWidth(40),
                        }}
                        onPress={() => {
                            navigation.navigate(PAGES.GROUP_SPLIT_SCREEN);
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                            }}
                        >
                            Split Equally
                        </Text>
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
        paddingHorizontal: calcWidth(3),
    },
    categoryText: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(8),
        paddingLeft: calcWidth(1),
    },
    selectedCategory: {
        backgroundColor: '#ddd', // Highlight color for selected category,
        borderRadius: 10,
    },
});

export default TransactionFormScreen;
