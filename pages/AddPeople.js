import React, { useLayoutEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import COLOR from '../constants/Colors';
import { calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import ContactList from '../components/ContactList';
import { useContacts } from '../hooks/useContacts';
const AddPeople = ({ navigation }) => {
    const { selectedContacts } = useContacts();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        console.log(selectedContacts);
                    }}
                >
                    <Text
                        style={[
                            {
                                color: COLOR.BUTTON,
                                fontSize: getFontSizeByWindowWidth(15),
                            },
                        ]}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
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
