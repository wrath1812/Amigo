import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {decryptData} from '../helper/encryption';
import {useAuth} from "../context/AuthContext";
import { CARDS } from '../constants/string';
import { encryptData } from '../helper/encryption';
import {  getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import getEncryptionKey from '../util/getEncryptionKey';

function Import ({navigation})
{
    const {cards,setCards}=useAuth();
    const [password, setPassword] = useState('');
    const cardExists = (newCard) => {
        return cards.some((card) => card.card_number === newCard.card_number);
    };

    const encryptCard = (newCard, encryptionKey) => {
        return encryptData(JSON.stringify(newCard), encryptionKey);
    };

    const initializeCardStorage = async (newCards) => {
        await setLocalStoreData(CARDS, newCards);
    };

    const updateCardStorage = async (newCards) => {
        await setLocalStoreData(CARDS, newCards);
    };

    const updateCards = (newCard) => {
        setCards((prev) => [{ index: prev.length, ...newCard }, ...prev]);
    };
    const onAddCard = async (newCard) => {
        try {
            if (cardExists(newCard)) {
                return;
            }

            const encryptionKey = await getEncryptionKey();

            const encryptedCard = encryptCard(newCard, encryptionKey);
            const savedCards = await getLocalStoreData(CARDS);

            if (!savedCards || savedCards.length === 0) {
                await initializeCardStorage([encryptedCard]);
            } else {
                await updateCardStorage([...savedCards, encryptedCard]);
            }

            updateCards(newCard);
            return newCard.nickname;
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const importCards = async () => {
        if (password === '') {
            alert('Please enter a password');
            return;
        }

        const fileUri = await pickFile();
        if (fileUri === null) {
            return;
        }

        const encryptedCards = await FileSystem.readAsStringAsync(fileUri);

        try{
        const decryptedCards = decryptData(encryptedCards, password);
        const addedCards=await Promise.all(
            decryptedCards.map((card) => onAddCard(card))
        );
        console.log(addedCards);
        if(addedCards.some((card)=>card!==undefined))
        alert(`Added cards: ${addedCards.join('\n')}`);
        else
            alert('Cards already exist');

        }
        catch(error){
            alert('Wrong password');
            return;
        }
        navigation.goBack();
    };

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
        });
        if (result.type === 'cancel') {
            return null;
        }

        return result.assets[0].uri;
    };


    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Import Cards</Text>
                <Text style={styles.modalText}>
                    Select a password and the PDF file containing your encrypted cards.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <Button title="Import Cards" onPress={importCards} />
            </View>
        </View>
    );
}

export default Import;

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-around',
    },

    modalTitle: {

        fontSize: 20,
        textAlign: 'center',
    },

    modalText: {
        fontSize: 15,
        textAlign: 'center',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});