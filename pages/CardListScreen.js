import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper';

import AddCardBox from '../components/AddCardBox';
import BannerAd from '../components/BannerAd';
import CardBox from '../components/CardBox';
import Loader from '../components/Loader';
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
            {cards ? (
                cards.length === 0 ? (
                    <AddCardBox showModal={showModal} />
                ) : (
                    <>
                        <BannerAd />
                        <FlatList
                            data={cards}
                            renderItem={CardBox}
                            keyExtractor={(item) => item.card_number}
                        />
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
});

export default CardList;
