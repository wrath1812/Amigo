import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Pressable,
    Image,
    TextInput
} from 'react-native';
import { useTransaction } from '../context/TransactionContext';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import LoginImage from '../assets/Login.png';
import PAGES from "../constants/pages";
import sliceText from '../helper/sliceText';

const GroupSplitScreen = ({navigation}) => {
    const { transactionData, setTransactionData } = useTransaction();
    const [members, setMembers] = useState(transactionData.splitAmong.map(member => ({
        ...member,
        isAmountManuallyEntered: false
      })));

      const handleAmountChange = (amount, id) => {
        const newAmount = parseInt(amount) || 0;
    
        let totalAmount = transactionData.amount || 0; // Total amount to be split
        let amountToDistribute = totalAmount - newAmount; // Amount remaining to distribute
    
        // Calculate the total manually entered amount and reduce it from amountToDistribute
        members.forEach(member => {
          if (member.isAmountManuallyEntered && member.user._id !== id) {
            amountToDistribute -= member.amount;
          }
        });
    
        const membersNotEntered = members.filter(m => !m.isAmountManuallyEntered && m.user._id !== id);
        const perUserPayment = Math.floor(amountToDistribute / membersNotEntered.length);
        const remainder = amountToDistribute % membersNotEntered.length;
    
        let distributedRemainder = 0;
    
        const updatedMembers = members.map(member => {
          if (member.user._id === id) {
            // Update the member who's input was changed
            return { ...member, amount: newAmount, isAmountManuallyEntered: true };
          } else if (!member.isAmountManuallyEntered) {
            // Distribute the remaining amount among members who haven't entered their amount
            let adjustedAmount = perUserPayment;
            if (distributedRemainder < remainder) {
              adjustedAmount += 1;
              distributedRemainder++;
            }
            return { ...member, amount: adjustedAmount };
          }
          return member;
        });
    
        // Update the state with the new members array
        setMembers(updatedMembers);
    };
    
    
    
    const renderItem = ({ item }) => {
        return(
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

            <View style={styles.rowCentered}>
    <Text style={styles.amount}>$</Text>
    <TextInput 
        style={styles.amount} 
        value={String(item.amount)}
        onChangeText={(newAmount) => handleAmountChange(newAmount, item.user._id)}
    />
</View>

        </View>
    )};

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
                data={members}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            {/* <TouchableOpacity style={styles.addButton} onPress={addMember}>
                <Text style={styles.addButtonText}>
                    Add a new member in this group
                </Text>
            </TouchableOpacity> */}
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
    rowCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    amount: {
        alignItems: 'center',
        alignContent: 'center',
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(20),
    },
});

export default GroupSplitScreen;
