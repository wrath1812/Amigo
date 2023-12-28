import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Pressable,
    Image
} from 'react-native';
import { useTransaction } from '../context/TransactionContext';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import LoginImage from '../assets/Login.png';
import PAGES from "../constants/pages";
import sliceText from '../helper/sliceText';

const GroupSplitScreen = ({navigation}) => {
    const { transactionData, setTransactionData } = useTransaction();
    const [members, setMembers] = useState([
        { id: '1', name: 'You', amount: 15 },
        { id: '2', name: 'Binny', amount: 15 },
        { id: '3', name: 'Sheldon', amount: 15 },
    ]);

    const [totalAmount, setTotalAmount] = useState(75);


    const addMember = () => {
        const newId = (members.length + 1).toString();
        const newMember = {
            id: newId,
            name: 'New Member',
            amount: totalAmount / (members.length + 1),
        };
        setMembers((currentMembers) => {
            return currentMembers
                .map((member) => ({ ...member, amount: newMember.amount }))
                .concat(newMember);
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.memberContainer}>
            <View style={{
                flexDirection:"row",
                alignItems:"center"
            }}>
            <Image source={LoginImage} style={{
                        width:calcHeight(4),
                        height:calcHeight(4),
                        padding:calcWidth(3),
                        backgroundColor:COLOR.BUTTON,
                        borderRadius:calcHeight(2),
                        marginHorizontal:calcWidth(1)
                    }}/>
            <Text style={styles.memberName}>{item.user.name}</Text>
            </View>
            <Text style={styles.memberAmount}>${parseInt(item.amount)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    ${transactionData.amount ||0} Paid by
                </Text>
                <Pressable
                onPress={()=>navigation.navigate(PAGES.SELECT_PAID_BY)}
                 style={{
                    flexDirection:"row",
                    alignItems:"center",
                    borderWidth:1,
                    padding:calcHeight(0.5),
                    borderColor:"#D9D9D9",
                    borderRadius:5,
                }}>
                    <Image source={LoginImage} style={{
                        width:calcHeight(2),
                        height:calcHeight(2),
                        padding:calcWidth(3),
                        backgroundColor:COLOR.BUTTON,
                        borderRadius:calcHeight(2),
                        marginHorizontal:calcWidth(1)
                    }}/>
                    <Text style={{
                        color:COLOR.TEXT,
                        fontWeight:"bold",
                        fontSize:getFontSizeByWindowWidth(10)
                    }}>{sliceText(transactionData.paidBy.name,7)}</Text>
                </Pressable>
            </View>
            
            <Text
            style={{
                fontSize:getFontSizeByWindowWidth(15),
                color:COLOR.TEXT,
                fontWeight:"bold",
                padding:calcWidth(5)
            }}
            >Split between</Text>
            
            <FlatList
                data={transactionData.splitAmong}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.addButton} onPress={addMember}>
                <Text style={styles.addButtonText}>
                    Add a new member in this group
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
        padding:calcHeight(2)
    },
    header: {
        padding: calcWidth(5),
        alignItems: 'center',
        borderColor:COLOR.BUTTON,
        borderWidth:1,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    memberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    memberName: {
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight:"bold",
        color:COLOR.TEXT,
        marginLeft:calcWidth(2)
    },
    memberAmount: {
        fontSize: getFontSizeByWindowWidth(15),
        color:COLOR.TEXT,
        fontWeight:"bold"
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default GroupSplitScreen;
