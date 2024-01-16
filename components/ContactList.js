// ContactList.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import ContactCard from './ContactCard';
import Search from './Search';
import { useContacts } from '../hooks/useContacts';
import { calcHeight, calcWidth } from '../helper/res';
const ContactList = () => {
    const {
        search,
        setSearch,
        contacts,
        selectedContacts,
        handleSelectContact,
        setSelectedContacts,
    } = useContacts();

    useEffect(() => {
        setSelectedContacts([]);
    }, []);
    return (
        <View>
            <Search search={search} setSearch={setSearch} />
            <FlatList
                style={{
                    marginTop: calcHeight(5),
                }}
                data={contacts}
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
        </View>
    );
};

export default ContactList;
