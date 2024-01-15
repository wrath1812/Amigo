import React, { useState, useEffect, useRef } from 'react';
import {
    View,
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
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import Toast from 'react-native-root-toast';
import apiHelper from '../helper/apiHelper';
import generateRandomColor from '../helper/generateRandomColor';
import Search from '../components/Search';
import Loader from '../components/Loader';
import { useContacts } from '../hooks/useContacts';

import ContactList from '../components/ContactList';
const CreateGroup = ({ navigation }) => {
    const { selectedContacts } = useContacts(); // Use the useContact component

    const [groupName, setGroupName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef();

    const createGroupAsync = async () => {
        setIsLoading(true);
        const phoneNumbers = selectedContacts.map(({ phoneNumber }) => ({
            phoneNumber,
            countryCode: '91',
        }));
        const group = await apiHelper.post('/group', {
            name: groupName,
            phoneNumbers,
        });
        navigation.goBack({ group });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <Text style={styles.heading}>New group</Text>
                <Pressable
                    style={styles.inputContainer}
                    onPress={() => nameRef.current.focus()}
                >
                    <TextInput
                        style={styles.input}
                        onChangeText={setGroupName}
                        value={groupName}
                        placeholder="Group Name"
                        placeholderTextColor="gray"
                        ref={nameRef}
                    />
                </Pressable>
                <View>
                    <Text style={styles.titleText}>Add members</Text>
                </View>
                <View style={{
                    margin: calcWidth(5),
                    alignItems:"center",
                    height:calcHeight(50)
                }}>
                <ContactList />
                </View>
                
                <View style={styles.button}>
                    <Button
                        title="Create Group"
                        onPress={
                            selectedContacts.length === 0 || groupName === ''
                                ? () =>
                                      Toast.show('Select a contact', {
                                          duration: Toast.durations.LONG,
                                      })
                                : createGroupAsync
                        }
                        styleOverwrite={
                            selectedContacts.length === 0 || groupName === ''
                                ? { opacity: 0.57 }
                                : {}
                        }
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
    },
    heading: {
        color: COLOR.PRIMARY,
        marginVertical: calcHeight(2),
        fontSize: getFontSizeByWindowWidth(20),
        fontWeight: 'bold',
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
        color: 'white',
    },
    titleText: {
        color: COLOR.PRIMARY,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
        marginVertical: calcHeight(2),
    },
    button: {
        alignItems: 'center',
    }
});

export default CreateGroup;
