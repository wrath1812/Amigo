import React, { useEffect, useState, useCallback,useLayoutEffect} from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Pressable,
    Image,
    FlatList 
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
import { Ionicons } from '@expo/vector-icons'; 
import TransactionCard from '../components/TransactionCard';
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



    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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



    useFocusEffect(fetchTransactions);

    if (isLoading) {
        return <Loader />; // Your Loader component to indicate loading state
    }

    return (
        <SafeAreaView style={styles.container}>

             <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()}> 
             <Ionicons name="chevron-back" size={calcHeight(3)} color="#87CEEB" />
             </Pressable>
             <View style={{flexDirection:"row",alignItems:"center"}}>
                    <GroupIcon image={LoginIcon}/>
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupMembers}>{getMembersString(group.members)}</Text>
                    </View>
                    </View>
                    <AntDesign name="scan1" size={24} color="white" />
                    <SimpleLineIcons name="options-vertical" size={24} color="white" />
                </View>
          <FlatList
          inverted
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TransactionCard transaction={item}/>
          )}
          />
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
        alignItems:"center"
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
