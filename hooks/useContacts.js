import React, { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import generateRandomColor from '../helper/generateRandomColor';

export const useContacts = () => {
    const [allContacts, setAllContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();

                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.Name,
                            Contacts.Fields.PhoneNumbers,
                            Contacts.Fields.Image,
                        ],
                    });

                    if (data.length > 0) {
                        const seenPhoneNumbers = new Set();
                        const uniqueContacts = data.filter((contact) => {
                            const phoneNumber =
                                contact.phoneNumbers?.[0].number.replace(
                                    /\D/g,
                                    '',
                                );
                            return (
                                phoneNumber &&
                                !seenPhoneNumbers.has(phoneNumber) &&
                                seenPhoneNumbers.add(phoneNumber)
                            );
                        });

                        const simplifiedContacts = uniqueContacts.map(
                            (contact) => ({
                                id: contact.id,
                                name: contact.name || '',
                                phoneNumber:
                                    contact.phoneNumbers[0].number.replace(
                                        /\D/g,
                                        '',
                                    ),
                                imageURI: contact.imageAvailable
                                    ? contact.image.uri
                                    : '',
                                color: generateRandomColor(),
                            }),
                        );

                        setAllContacts(simplifiedContacts);
                        setFilteredContacts(simplifiedContacts);
                    }
                }
            } catch (error) {
                console.error('Error loading contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        loadContacts();
    }, []);

    useEffect(() => {
        // Update filtered contacts whenever search changes
        const filtered = allContacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(search.toLowerCase()) ||
                contact.phoneNumber.includes(search),
        );
        setFilteredContacts(filtered);
    }, [search, allContacts]);

    const handleSelectContact = (contact) => {
        const isSelected = selectedContacts.some(
            (selected) => selected.id === contact.id,
        );
        setSelectedContacts(
            isSelected
                ? selectedContacts.filter(
                      (selected) => selected.id !== contact.id,
                  )
                : [...selectedContacts, contact],
        );
    };

    return {
        contacts: filteredContacts, // Use filteredContacts instead of allContacts
        search,
        setSearch,
        selectedContacts,
        handleSelectContact,
        loading,
    };
};
