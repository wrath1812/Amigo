// 1. Import Statements
import React, { useRef, useState, useCallback } from 'react';
import {
    Text, StyleSheet, SafeAreaView, View, Pressable, FlatList, TouchableOpacity, TextInput
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
import { getFontSizeByWindowWidth } from '../helper/res';

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

function GroupScreen({ navigation, route: { params: { group } } }) {
    const textRef=useRef();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [text,setText]=useState("");

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
            <FlatList
                inverted
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                style={{
                    height:calcHeight(70)
                }}
            />
            <View style={{
                flex:1,
                flexDirection:"row",
                margin:calcHeight(2)
            }}>
                <Pressable
        style={styles.inputContainer}
        onPress={() => textRef.current.focus()}
    >
        <TextInput
            style={styles.input}
            placeholderTextColor="#ccc"
            ref={textRef}
            placeholder='Enter the amount'
            textAlign='center'
        />
    </Pressable>
            <TouchableOpacity
            style={styles.button}
        >
            <Text style={styles.buttonText}>$ Settle</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            // onPress={onPress}
        >
            <Text style={styles.buttonText}>+ Expense</Text>
        </TouchableOpacity>
            </View>
            <FabIcon onPress={() => navigation.navigate(PAGES.ADD_TRANSACTION, { group })} />
        </SafeAreaView>
    );
    }

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
        button: {
            flex:1,
            display: 'flex',
            justifyContent: 'center', // Centers child horizontally in the container
            alignItems: 'center',
            width: calcWidth(15),
            paddingVertical: calcHeight(2),
            borderRadius: 10,
            backgroundColor: COLOR.BUTTON,
            elevation: 3,
            marginTop: calcHeight(4),
        },
        buttonText: {
            fontSize: getFontSizeByWindowWidth(12),
            color: 'white',
            alignItems: 'center',
        },
        inputContainer: {
            flex: 1,
            color: 'white',
            height:calcHeight(5)
        },
        input: {
            margin: calcWidth(3),
            height:"100%",
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            width: calcWidth(35),
            color:"white"
        }
    });


// 9. Export Statement
export default GroupScreen;
