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
import { useGroup } from '../context/GroupContext';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
const AddPeople = ({ navigation }) => {
    const { selectedContacts } = useContacts();
    const { group } = useGroup();
    function addMembers() {
        apiHelper.patch(
            `/group/${group._id}`,
            selectedContacts.map((contact) => ({
                phoneNumber: contact.phoneNumber,
                countryCode: '91',
            })),
        );
        navigation.navigate(PAGES.GROUP);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={addMembers}>
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
    }, [navigation, selectedContacts]);
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
