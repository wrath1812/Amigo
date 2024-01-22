// ContactList.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import ContactCard from './ContactCard';
import Search from './Search';
import { useContacts } from '../hooks/useContacts';
import { calcHeight, calcWidth } from '../helper/res';
import openSettings from '../helper/openSettings';
import { Button } from 'react-native-paper';
import COLOR from '../constants/Colors';
const ContactList = ({ eliminatedContacts }) => {
    const {
        search,
        setSearch,
        contacts,
        selectedContacts,
        handleSelectContact,
        setSelectedContacts,
        contactPermission,
    } = useContacts();

    useEffect(() => {
        setSelectedContacts([]);
    }, []);

    function eliminateContacts() {
        if (!eliminatedContacts) return contacts;

        return contacts.filter(
            (contact) =>
                !eliminatedContacts
                    .map((member) => member.phoneNumber)
                    .includes(contact.phoneNumber),
        );
    }

    function askPermission() {
        Alert.alert(
            'Permission Required',
            'We need permission to access your contacts to add people to the group',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Open Settings',
                    onPress: openSettings,
                },
            ],
        );
        return;
    }

    return (
        <View>
            <Search search={search} setSearch={setSearch} />
            {contactPermission ? (
                <FlatList
                    style={{
                        marginTop: calcHeight(5),
                    }}
                    data={eliminateContacts()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSelectContact(item)}>
                            <ContactCard
                                {...item}
                                selected={selectedContacts.some(
                                    (selected) => selected.id === item.id,
                                )}
                            />
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Pressable
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                    onPress={openSettings}
                >
                    <Text
                        style={{
                            color: COLOR.TEXT,
                        }}
                    >
                        Allow Camera Permission
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default ContactList;
