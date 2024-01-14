// React Native Components and Utilities
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Custom Components and Utility Functions
import GroupIcon from '../components/GroupIcon';
import  convertISODateToCustomFormat  from '../helper/convertISODateToCustomFormat'; // Assuming you move this function to a utils.js file
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';

// ExpenseCard Component
function ExpenseCard({ item }) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardInnerContainer}>
                <View>
                    <GroupIcon size={{ width: calcHeight(5), height: calcHeight(5) }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.groupText}>{item.group}</Text>
                    <Text style={styles.dateText}>{convertISODateToCustomFormat(item.date)}</Text>
                </View>
            </View>
            <Text style={styles.amountText}>₹{item.amount}</Text>
        </View>
    );
}

export default ExpenseCard;

// StyleSheet
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        paddingVertical: calcHeight(1),
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.13)',
        alignItems: 'center',
    },
    cardInnerContainer: {
        flexDirection: 'row',
        paddingVertical: calcHeight(1),
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%',
    },
    textContainer: {
        gap: calcHeight(1),
    },
    descriptionText: {
        color: COLOR.BUTTON,
        fontWeight: 'bold',
        fontSize: getFontSizeByWindowWidth(15),
    },
    groupText: {
        color: 'white',
    },
    dateText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(8),
    },
    amountText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(15),
    },
});
