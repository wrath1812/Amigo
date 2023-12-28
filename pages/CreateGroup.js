import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    ScrollView,
    Text,
    SafeAreaView,
    TextInput,
    Pressable,
    StyleSheet,
    FlatList,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import COLOR from '../constants/Colors';
import ContactCard from '../components/ContactCard';
import Button from '../components/Button';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import Toast from 'react-native-root-toast';
import apiHelper from '../helper/apiHelper';
import generateRandomColor from '../helper/generateRandomColor';
import Search from "../components/Search";
import Loader from '../components/Loader';

const CreateGroup = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const nameRef=useRef();

    useEffect(() => {
        const loadContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
                });

                if (data.length > 0) {
                    const seenPhoneNumbers = new Set();
                    const uniqueContacts = data.filter(contact => {
                        const phoneNumber = contact.phoneNumbers?.[0].number.replace(/\D/g, '');
                        return phoneNumber && !seenPhoneNumbers.has(phoneNumber) && seenPhoneNumbers.add(phoneNumber);
                    });

                    const simplifiedContacts = uniqueContacts.map(contact => ({
                        id: contact.id,
                        name: contact.name || '',
                        phoneNumber: contact.phoneNumbers[0].number.replace(/\D/g, ''),
                        imageURI: contact.imageAvailable ? contact.image.uri : '',
                        color: generateRandomColor(),
                    }));

                    setContacts(simplifiedContacts);
                }
            }
        };

        loadContacts();
    }, []);

    const createGroupAsync = async () => {
        setIsLoading(true);
        const phoneNumbers = selectedContacts.map(({ phoneNumber }) => ({
            phoneNumber,
            countryCode: '91',
        }));
        const group = await apiHelper.post('/group', { name: groupName, phoneNumbers });
        navigation.goBack({ group });
    };

    const handleSelectContact = contact => {
        const isSelected = selectedContacts.some(selected => selected.id === contact.id);
        setSelectedContacts(isSelected ? selectedContacts.filter(selected => selected.id !== contact.id) : [...selectedContacts, contact]);
    };

    const filterContacts = () => search === '' ? contacts : contacts.filter(contact => 
        contact.name.toLowerCase().includes(search.toLowerCase()) || contact.phoneNumber.includes(search));

    return isLoading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
            <Text style={styles.heading}>New group</Text>
            <Pressable style={styles.inputContainer} onPress={() => nameRef.current.focus()}>
                <TextInput
                    style={styles.input}
                    onChangeText={setGroupName}
                    value={groupName}
                    placeholder="Group Name"
                    placeholderTextColor="gray"
                    ref={nameRef}
                />
            </Pressable>
            <View style={styles.title}>
                <Text style={styles.titleText}>Add members</Text>
            </View>
            <Search search={search} setSearch={setSearch} />
            <Text style={styles.contactLabel}>Contacts</Text>
            <FlatList
                data={filterContacts()}
                style={styles.flatList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleSelectContact(item)}>
                        <ContactCard {...item} selected={selectedContacts.some(selected => selected.id === item.id)} />
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.button}>
                <Button
                    title="Create Group"
                    onPress={selectedContacts.length === 0 || groupName === '' ? () => Toast.show('Select a contact', { duration: Toast.durations.LONG }) : createGroupAsync}
                    styleOverwrite={selectedContacts.length === 0 || groupName === '' ? { opacity: 0.57 } : {}}
                />
            </View>
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND
    },
    scroll: {
        marginHorizontal: calcWidth(5),
        justifyContent:"flex-end"
    },
    heading: {
        color: COLOR.PRIMARY,
        marginVertical: calcHeight(2),
        fontSize: getFontSizeByWindowWidth(20),
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcHeight(1),
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: calcHeight(2),
    },
    input: {
        flex: 1,
        color: 'white',
    },
    title: {
        alignSelf: 'flex-start',
        marginVertical: calcHeight(2),
    },
    titleText: {
        color: COLOR.PRIMARY,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
        marginVertical: calcHeight(2),
    },
    button: {
        alignItems: "center",
    },
    contactLabel: {
        marginVertical: calcHeight(4),
        color: 'rgba(255, 255, 255, 0.65)',
    },
});

export default CreateGroup;
