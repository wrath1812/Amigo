import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import COLOR from '../constants/Colors';
import { calcHeight } from '../helper/res';
import ContactList from '../components/ContactList';
const AddPeople = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    margin: calcHeight(5),
                }}
            >
                <ContactList />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
});

export default AddPeople;
