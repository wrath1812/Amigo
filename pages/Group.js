import React, { useEffect, useState, useCallback,useLayoutEffect } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Pressable,
    Image
} from 'react-native';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import {useAuth} from "../context/AuthContext";
import LoginIcon from "../assets/Login.png";
import GroupIcon from "../components/GroupIcon";
import { calcHeight,calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons'; 

function getMembersString(members) {
    let names = [];

    for (let i = 0; i < members.length; i++) {
        if (members[i].hasOwnProperty('name') && members[i].name) {
            // Split the name string by spaces and take the first part
            let namePart = members[i].name.split(' ')[0];
            names.push(namePart);
        }
    }

    return names.join(', ');
}

function GroupScreen({
    navigation,
    route: {
        params: { group },
    },
}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.header}>
                    <GroupIcon image={LoginIcon}/>
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupMembers}>{getMembersString(group.members)}</Text>
                    </View>
                    <AntDesign name="scan1" size={24} color="white" />
                    <SimpleLineIcons name="options-vertical" size={24} color="white" />
                </View>
            ),
            headerStyle: {
                backgroundColor: COLOR.APP_BACKGROUND,
            },
        });
      }, [navigation, group.id]);


    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [balances,setBalances]=useState([]);
    const {user}=useAuth();

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper(`/group/${group._id}/transactions`);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        setIsLoading(false);
    }, [group]);


    const fetchBalances= useCallback(async () => {
        try {
            const { data } = await apiHelper(`/balance/${group._id}`);
            setBalances(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [group]);

    useFocusEffect(fetchTransactions);
    useFocusEffect(fetchBalances);

    if (isLoading) {
        return <Loader />; // Your Loader component to indicate loading state
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
{
    balances && balances.length > 0 && balances.map((balance) => {
        const isLender = user._id === balance.lender._id;
        const isBorrower = user._id === balance.borrower._id;

        const lenderName = isLender ? "You" : balance.lender.name;
        const borrowerName = isBorrower ? "You" : balance.borrower.name;
        const amountOwed = balance.amount;

        return (
            <Text>
                {`${borrowerName} owe ${lenderName} ${amountOwed}`}
            </Text>
        );
    })
}

                {transactions.map((transaction) => (
                    <Pressable
                        key={transaction._id}
                        style={styles.transactionCard}
                    >
                        <Text style={styles.description}>
                            {transaction.description}
                        </Text>
                        <Text>Amount: ${transaction.amount}</Text>
                        <Text>
                            Date:{' '}
                            {new Date(transaction.date).toLocaleDateString()}
                        </Text>
                        <Text>Paid By {transaction.paidBy.name}</Text>
                        <View>
                            <Text>Split among:</Text>
                            {transaction.splitAmong.map((person) => (
                                <Text key={person.user._id}>
                                    User: {person.user.name} - Amount: $
                                    {person.amount}
                                </Text>
                            ))}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
            <FabIcon
                onPress={() =>
                    navigation.navigate(PAGES.ADD_TRANSACTION, { group })
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLOR.APP_BACKGROUND
    },
    scrollView: {
        width: '100%',
    },
    transactionCard: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        backgroundColor: '#fff',
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    header:{
        width:"90%",
        flexDirection:"row",
        padding:calcHeight(1),
        justifyContent:"space-between",
    },
    image: {
        height:calcHeight(4),
        width:calcHeight(4)
    },
    imageContainer:{
        padding:calcWidth(2),
        borderRadius:calcHeight(10),
        backgroundColor:COLOR.BUTTON
    },
    groupName:{
        color:"white",
        fontWeight:"bold"
    },
    groupMembers:{
        color:"#A5A5A5",
        alignContent:"center"
    },
    groupNameContainer:{
        marginLeft:calcWidth(5)
    }
});

export default GroupScreen;
