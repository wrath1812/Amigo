import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Pressable,
    Image,
    TextInput,
} from 'react-native';
import { useTransaction } from '../context/TransactionContext';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import LoginImage from '../assets/Login.png';
import PAGES from '../constants/pages';
import sliceText from '../helper/sliceText';
import { useLayoutEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GroupSplitScreen = ({ navigation }) => {
    const { transactionData, setTransactionData } = useTransaction();
    const [members, setMembers] = useState(
        transactionData.splitAmong.map((member) => ({
            ...member,
            isAmountManuallyEntered: false,
            included: true,
        })),
    );

    const submitSplit = () => {
        // Filter out members who are not included
        const includedMembers = members.filter((member) => member.included);

        setTransactionData((prev) => ({
            ...prev,
            splitAmong: includedMembers.map(({ user, amount }) => ({
                user,
                amount,
            })),
        }));

        // Navigate back to the previous screen after updating
        navigation.goBack();
    };

    const toggleMemberIncluded = (memberId) => {
        setMembers((prevMembers) => {
            const updatedMembers = prevMembers.map((member) => {
                if (member.user._id === memberId) {
                    return {
                        ...member,
                        included: !member.included,
                        isAmountManuallyEntered: member.included
                            ? false
                            : member.isAmountManuallyEntered,
                        amount: member.included ? 0 : member.amount,
                    };
                }
                return member;
            });
            redistributeAmounts(updatedMembers);
            return updatedMembers;
        });
    };

    const redistributeAmounts = (updatedMembers) => {
        let totalAmount = transactionData.amount || 0;

        // Calculate total amount already manually entered by included members
        let manuallyEnteredTotal = updatedMembers.reduce((acc, member) => {
            return member.isAmountManuallyEntered && member.included
                ? acc + member.amount
                : acc;
        }, 0);

        // Calculate remaining amount to distribute
        let amountToDistribute = totalAmount - manuallyEnteredTotal;

        // Distribute the remaining amount among the members who haven't manually entered their amounts and are included
        let membersNotEntered = updatedMembers.filter(
            (m) => !m.isAmountManuallyEntered && m.included,
        );
        const perUserPayment = Math.max(
            Math.floor(amountToDistribute / membersNotEntered.length),
            0,
        );
        const remainder = amountToDistribute % membersNotEntered.length;

        let distributedRemainder = 0;
        updatedMembers.forEach((member) => {
            if (!member.isAmountManuallyEntered && member.included) {
                let adjustedAmount = perUserPayment;
                if (distributedRemainder < remainder) {
                    adjustedAmount += 1;
                    distributedRemainder++;
                }
                member.amount = adjustedAmount;
            }
        });
    };

    const handleAmountChange = (amount, id) => {
        const newAmount = Math.max(parseInt(amount) || 0, 0);
        let totalAmount = transactionData.amount || 0;

        let manuallyEnteredTotal = newAmount;
        members.forEach((member) => {
            if (
                member.isAmountManuallyEntered &&
                member.user._id !== id &&
                member.included
            ) {
                manuallyEnteredTotal += member.amount;
            }
        });

        if (manuallyEnteredTotal > totalAmount) {
            // Handle the case where the total exceeds the limit
            // Reset newAmount or alert the user
            return; // Exit the function or reset newAmount as needed
        }

        setMembers((prevMembers) => {
            let amountToDistribute = totalAmount - manuallyEnteredTotal;
            let membersNotEntered = prevMembers.filter(
                (m) =>
                    !m.isAmountManuallyEntered &&
                    m.user._id !== id &&
                    m.included,
            );
            const perUserPayment = Math.max(
                Math.floor(amountToDistribute / membersNotEntered.length),
                0,
            );
            const remainder = amountToDistribute % membersNotEntered.length;

            let distributedRemainder = 0;
            return prevMembers.map((member) => {
                if (member.user._id === id) {
                    return {
                        ...member,
                        amount: newAmount,
                        isAmountManuallyEntered: true,
                    };
                } else if (!member.isAmountManuallyEntered && member.included) {
                    let adjustedAmount = perUserPayment;
                    if (distributedRemainder < remainder) {
                        adjustedAmount += 1;
                        distributedRemainder++;
                    }
                    return { ...member, amount: adjustedAmount };
                }
                return member;
            });
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={submitSplit}>
                    <Text style={[styles.tabBarText]}>Done</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.memberContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => toggleMemberIncluded(item.user._id)}
                    >
                        <MaterialCommunityIcons
                            name={
                                item.included
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                            }
                            size={24}
                            color={item.included ? COLOR.BUTTON : COLOR.TEXT}
                        />
                    </TouchableOpacity>
                    <Image
                        source={LoginImage}
                        style={{
                            width: calcHeight(4),
                            height: calcHeight(4),
                            padding: calcWidth(3),
                            backgroundColor: COLOR.BUTTON,
                            borderRadius: calcHeight(2),
                            marginHorizontal: calcWidth(1),
                        }}
                    />
                    <Text style={styles.memberName}>{item.user.name}</Text>
                </View>

                <View style={styles.rowCentered}>
                    <Text style={styles.amount}>$</Text>
                    <TextInput
                        style={styles.amount}
                        value={String(item.amount)}
                        onChangeText={(newAmount) =>
                            handleAmountChange(newAmount, item.user._id)
                        }
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    ${transactionData.amount || 0} Paid by
                </Text>
                <Pressable
                    onPress={() => navigation.navigate(PAGES.SELECT_PAID_BY)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        padding: calcHeight(0.5),
                        borderColor: '#D9D9D9',
                        borderRadius: 5,
                    }}
                >
                    <Image
                        source={LoginImage}
                        style={{
                            width: calcHeight(2),
                            height: calcHeight(2),
                            padding: calcWidth(3),
                            backgroundColor: COLOR.BUTTON,
                            borderRadius: calcHeight(2),
                            marginHorizontal: calcWidth(1),
                        }}
                    />
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontWeight: 'bold',
                            fontSize: getFontSizeByWindowWidth(10),
                        }}
                    >
                        {sliceText(transactionData.paidBy.name, 7)}
                    </Text>
                </Pressable>
            </View>

            <Text
                style={{
                    fontSize: getFontSizeByWindowWidth(15),
                    color: COLOR.TEXT,
                    fontWeight: 'bold',
                    padding: calcWidth(5),
                }}
            >
                Split between
            </Text>

            <FlatList
                data={members}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
        padding: calcHeight(2),
    },
    header: {
        padding: calcWidth(5),
        alignItems: 'center',
        borderColor: COLOR.BUTTON,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    memberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    memberName: {
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
        color: COLOR.TEXT,
        marginLeft: calcWidth(2),
    },
    memberAmount: {
        fontSize: getFontSizeByWindowWidth(15),
        color: COLOR.TEXT,
        fontWeight: 'bold',
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
        fontSize: getFontSizeByWindowWidth(20),
    },
    tabBarText: {
        color: COLOR.BUTTON,
        fontSize: getFontSizeByWindowWidth(15),
    },
});

export default GroupSplitScreen;
