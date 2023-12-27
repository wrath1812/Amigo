// 1. Import Statements
import React, { useEffect, useState, useCallback } from 'react';
import {
    Text, StyleSheet, SafeAreaView, View, Pressable, FlatList
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import TransactionCard from '../components/TransactionCard';
import LoginIcon from '../assets/Login.png';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth } from '../helper/res';
import TextInput from '../components/TextInput';

// 2. Utility Functions
function getMembersString(members) {
    let names = [];
    for (let i = 0; i < members.length; i++) {
        if (members[i].hasOwnProperty('name') && members[i].name) {
            let namePart = members[i].name.split(' ')[0];
            names.push(namePart);
        }
    }
    return names.join(', ');
}

// 3. Component Definition
function GroupScreen({ navigation, route: { params: { group } } }) {
    // 4. State and Context Hooks
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [amount,setAmount]=useState("");

    const fetchTransactions = useCallback(async () => {
        navigation.get
        setIsLoading(true);
        try {
            const { data } = await apiHelper(`/group/${group._id}/transactions`);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        setIsLoading(false);
    }, [group]);

    useFocusEffect(fetchTransactions);

    // 6. Render Logic
    if (isLoading) {
        return <Loader />;
    }

    // 7. JSX Markup
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={calcHeight(3)} color="#87CEEB" />
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <GroupIcon image={LoginIcon} />
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupMembers}>
                            {getMembersString(group.members)}
                        </Text>
                    </View>
                </View>
                <AntDesign name="scan1" size={24} color="white" />
                <SimpleLineIcons name="options-vertical" size={24} color="white" />
            </View>
            <View style={{
                flex:1,
                flexDirection:"row",
                
            }}>
                <TextInput
                placeHolder="kuhkh"
                />
            </View>
            <FlatList
                inverted
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                style={{
                    height:calcHeight(80)
                }}
            />
            
            <FabIcon onPress={() => navigation.navigate(PAGES.ADD_TRANSACTION, { group })} />
        </SafeAreaView>
    );
    }

    // 8. Styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLOR.APP_BACKGROUND,
        },
        header: {
            width: '90%',
            flexDirection: 'row',
            padding: calcHeight(1),
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        groupNameContainer: {
            marginLeft: calcWidth(5),
        },
        groupName: {
            color: 'white',
            fontWeight: 'bold',
        },
        groupMembers: {
            color: '#A5A5A5',
        },
    });


// 9. Export Statement
export default GroupScreen;
