// useContact.js
import React, { useState, useEffect, useRef } from 'react';
import * as Contacts from 'expo-contacts';

const useContact = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        const loadContacts = async () => {
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
                            contact.phoneNumbers?.[0].number.replace(/\D/g, '');
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
                            phoneNumber: contact.phoneNumbers[0].number.replace(
                                /\D/g,
                                '',
                            ),
                            imageURI: contact.imageAvailable
                                ? contact.image.uri
                                : '',
                            color: generateRandomColor(),
                        }),
                    );

                    setContacts(simplifiedContacts);
                }
            }
        };

        loadContacts();
    }, []);

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

    const filterContacts = () =>
        search === ''
            ? contacts
            : contacts.filter(
                  (contact) =>
                      contact.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      contact.phoneNumber.includes(search),
              );

    return {
        contacts,
        search,
        setSearch,
        selectedContacts,
        handleSelectContact,
        filterContacts,
    };
};

export default useContact;
