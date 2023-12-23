import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import PAGES from '../constants/pages';
import { useAuth } from '../context/AuthContext';
import { calcHeight, calcWidth } from '../helper/res';

function CardList({ navigation }) {
    const { cards } = useAuth();

    const showModal = () => {
        navigation.navigate(PAGES.ADD_CARD);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>rc</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5), // 5% of the device height
        right: calcWidth(5), // 5% of the device width
    },
    fab: {
        backgroundColor: 'white',
    },
});

export default CardList;
