import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import Card from './card';
import * as CardValidator from 'card-validator';
import Modal from 'react-native-modal';

function AddCardModal({ onAddCard, visible, hideModal }) {
    const [card, setCard] = useState({
        nickname: '',
        card_number: '',
        expiry: '', // Set the default value with the slash
        cvv: '',
        color: 'black',
        type: '',
        name_on_card: '',
    });

    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCVVValid, setIsCVVValid] = useState(true);

    const formatCardNumber = (input) => {
        const formattedInput = input
            .replace(/\s/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .trim();

        // Validate the card number in real-time
        const cardNumberValidation = CardValidator.number(formattedInput);
        setIsCardNumberValid(cardNumberValidation.isValid);

        // Update card type based on the validation result
        let cardType = cardNumberValidation.card
            ? cardNumberValidation.card.type
            : '';

        // Manually check for Discover card based on BIN range
        const discoverBINPattern = /^6(?:011|5[0-9]{2})/; // Discover cards typically start with '6011' or '65'
        if (discoverBINPattern.test(formattedInput)) {
            cardType = 'Discover';
        }

        // Manually check for Rupay card based on BIN range
        const rupayBINPattern = /^65/; // Rupay cards start with '65'
        if (rupayBINPattern.test(formattedInput)) {
            cardType = 'rupay';
        }

        // Set the card type in the card state
        setCard((prevCard) => ({
            ...prevCard,
            card_number: formattedInput,
            type: cardType,
        }));
    };

    // Function to format and validate the expiry date
    const formatAndValidateExpiry = (text) => {
        // Remove any non-numeric characters
        const formattedText = text.replace(/[^0-9]/g, '');

        // Insert a slash ("/") between the month and year
        let formattedExpiry = '';
        if (formattedText.length > 2) {
            formattedExpiry =
                formattedText.slice(0, 2) + '/' + formattedText.slice(2);
        } else {
            formattedExpiry = formattedText;
        }

        // Always set the state with the formatted expiry
        setCard({ ...card, expiry: formattedExpiry });
    };

    const validateCVV = (cvv) => {
        // Check if the card type is Amex and adjust the CVV validation accordingly
        const isAmex = card.type.toLowerCase() === 'american-express';

        // Define the CVV length based on the card type (Amex: 4 digits, others: 3 digits)
        const expectedCVVLength = isAmex ? 4 : 3;

        // Validate the CVV length and whether it's numeric
        const isValidCVV =
            cvv.length === expectedCVVLength && /^\d+$/.test(cvv);

        setIsCVVValid(isValidCVV);
    };

    const handleAddCard = () => {
        // Validate and process the card data
        if (
            card.nickname &&
            isCardNumberValid &&
            validateExpiry(card.expiry) &&
            isCVVValid
        ) {
            // Call the onAddCard function with the card data
            onAddCard(card);
            // Clear the form
            setCard({
                nickname: '',
                card_number: '',
                expiry: '', // Set the default value with the slash
                cvv: '',
                color: 'black',
                type: '',
                name_on_card: '',
            });
            setIsCardNumberValid(true);
            setIsCVVValid(true);
        }
    };

    const validateExpiry = (text) => {
        // Use a regular expression to match the MM/YY format (e.g., 12/23)
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(text);
    };

    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
            propagateSwipe={true}
            swipeDirection={['down']}
            onSwipeComplete={hideModal}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Card item={card} showCard={true} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nickname"
                        value={card.nickname}
                        onChangeText={(text) =>
                            setCard({ ...card, nickname: text })
                        }
                    />
                    <TextInput
                        style={[
                            styles.input,
                            !isCardNumberValid && styles.invalidInput,
                        ]}
                        placeholder="Card Number"
                        keyboardType="numeric"
                        value={card.card_number}
                        onChangeText={formatCardNumber}
                        maxLength={19}
                    />
                     <TextInput
                        style={
                            styles.input
                        }
                        placeholder="Name on the Card"
                        value={card.name_on_card}
                        onChangeText={(text) =>
                            setCard({ ...card, name_on_card: text })
                        }
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                !validateExpiry(card.expiry) &&
                                    styles.invalidInput,
                            ]}
                            placeholder="Expiry Date (MM/YY)"
                            value={card.expiry}
                            onChangeText={formatAndValidateExpiry}
                            maxLength={5}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={[
                                styles.input,
                                !isCVVValid && styles.invalidInput,
                            ]}
                            placeholder="CVV"
                            keyboardType="numeric"
                            value={card.cvv}
                            onChangeText={(text) => {
                                setCard({ ...card, cvv: text });
                                // Validate the CVV in real-time
                                validateCVV(text);
                            }}
                            maxLength={4}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddCard}
                    >
                        <Text style={styles.addButtonText}>Add Card</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    invalidInput: {
        borderColor: 'red', // Change border color for invalid input
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default AddCardModal;
