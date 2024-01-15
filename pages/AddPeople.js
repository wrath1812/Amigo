import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { MaterialIcons } from '@expo/vector-icons';
import ContactList from '../components/ContactList';
const AddPeople = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ContactList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingVertical: calcHeight(3),
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    question: {
        flex: 1, // Take up all available space
        fontSize: getFontSizeByWindowWidth(12),
        color: 'rgba(255,255,255,0.75)',
    },
    answer: {
        paddingTop: 10,
        color: '#666',
    },
});

export default AddPeople;
