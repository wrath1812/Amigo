import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import CardBox from '../components/CardBox';
import { FAB } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import AddCardBox from '../components/AddCardBox';
import { encryptData } from '../helper/encryption';
import { CARDS } from '../constants/string';
import getEncryptionKey from '../util/getEncryptionKey';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import BannerAd from '../components/BannerAd';
import PAGES from '../constants/pages';

function CardList({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { cards, setCards } = useAuth();


    const showModal = () => {
        // setModalVisible(true);
        navigation.navigate(PAGES.ADD_CARD);
    };


    return (
        <SafeAreaView
            style={{ ...styles.container, backgroundColor: '#1a1a1a' }}
        >
            {cards ? (
                cards.length == 0 ? (
                    <AddCardBox showModal={showModal} />
                ) : (
                    <>
                        <FlatList
                            data={cards}
                            renderItem={CardBox}
                            keyExtractor={(item) => item.card_number}
                        />
                        <BannerAd />
                    </>
                )
            ) : (
                <Loader />
            )}
            <View style={styles.fabContainer}>
                <FAB style={styles.fab} icon="plus" onPress={showModal} />
            </View>
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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: calcHeight(2), // 2% of the device height
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inputContainer: {
        marginTop: calcHeight(2), // 2% of the device height
        width: '100%',
    },
    inputField: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: calcHeight(1.5), // 1.5% of the device height
        padding: calcHeight(1.5), // 1.5% of the device height
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expiryField: {
        flex: 1,
        marginRight: calcWidth(2), // 2% of the device width
    },
    cvvField: {
        flex: 1,
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: calcHeight(1.5), // 1.5% of the device height
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(16), // Font size based on device width
        fontWeight: 'bold',
    },
});

export default CardList;
