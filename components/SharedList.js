import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import COLOR from '../constants/Colors';
import { calcWidth, getFontSizeByWindowWidth, calcHeight } from '../helper/res';
import SharedItem from '../components/SharedItem';
import TransactionNumberOfVisibleNames from '../constants/TransactionNumberOfVisibleNames';

const SharedList = ({ transaction, generateColor, expandNames, setExpandNames }) => {
    const visibleUsers = transaction.splitAmong.slice(0, TransactionNumberOfVisibleNames); // Display only the first 5 users

    return (
        <View>
            <Text style={styles.sharedLabel}>Shared with</Text>
            <View style={styles.sharedContainer}>
                <FlatList
                    data={expandNames ? transaction.splitAmong : visibleUsers}
                    keyExtractor={(item) => item.user._id}
                    renderItem={({ item, index }) => <SharedItem user={item.user} amount={item.amount} generateColor={generateColor} />}
                />
            </View>
        </View>
    );
};

export default SharedList;

const styles = StyleSheet.create({
    sharedLabel: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
        padding: calcWidth(2),
        backgroundColor: COLOR.BUTTON,
    },
    sharedUser: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
    },
    sharedDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: calcHeight(1),
        marginHorizontal: calcWidth(5),
    },
});
