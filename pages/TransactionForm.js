import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import Loader from '../components/Loader';
import COLOR from "../constants/Colors";
import {calcWidth,calcHeight,getFontSizeByWindowWidth} from "../helper/res";
function TransactionFormScreen({ navigation, route: { params: { group } } }) {
    const { user } = useAuth();
    const [loading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState({
        amount: '',
        description: '',
        paidBy: user._id,
        group: group._id,
        date: new Date(),
        splitAmong: [],
    });


    useEffect(() => {
        const perUserPayment = transactionData.amount / group.members.length;
        setTransactionData(prev => ({
            ...prev,
            splitAmong: group.members.map(({ _id }) => ({
                amount: perUserPayment,
                user: _id,
            })),
        }));
    }, [transactionData.amount, group.members]);

    const handleInputChange = (field, value) => {
        setTransactionData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper.post('/transaction', transactionData);
            Alert.alert('Success', 'Transaction saved successfully.');
            navigation.navigate(PAGES.TRANSACTION, { group });
        } catch (error) {
            Alert.alert('Error', 'There was an error saving the transaction.');
        }
        setIsLoading(false);
    };

    return loading ? (
        <Loader />
    ) : (
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection:"row",
                justifyContent:"center",
                alignContent:"center"
            }}>
            <Text style={styles.amount} >
                $
            </Text>
         <TextInput
                style={styles.amount}
                onChangeText={text => handleInputChange('amount', text)}
                value={transactionData.amount}
                keyboardType="numeric"
                placeholderTextColor={COLOR.TEXT}
                placeholder='0'
                autoFocus={true}
            />
 </View>
            <TextInput
                style={styles.input}
                onChangeText={text => handleInputChange('description', text)}
                value={transactionData.description}
                placeholder="Enter description"
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: calcWidth(5),
        backgroundColor: COLOR.APP_BACKGROUND,
        alignContent:"center",
    },
    amount: {
        alignItems:"center",
        alignContent:"center",
        color: COLOR.TEXT,
        fontSize:getFontSizeByWindowWidth(50)
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TransactionFormScreen;
