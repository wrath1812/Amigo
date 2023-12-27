import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import COLOR from '../constants/Colors';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from "../helper/res";
import generateRandomColor from "../helper/generateRandomColor";
import {useAuth} from "../context/AuthContext";
import DatePicker from '../components/DatePicker';
const TransactionDetail = ({ navigation, route: { params: { transaction } } }) => {
    const [date,setDate]=useState(new Date(transaction.date));
    const {user}=useAuth();
  return (
    <SafeAreaView style={styles.container}>
        <View style={{
            alignItems:"center"
        }}>
        <Text style={{
            fontSize:getFontSizeByWindowWidth(25),
            color:COLOR.TEXT,
            fontWeight:"bold"
        }}>$ {transaction.amount}</Text>
        <Text style={{
            fontSize:getFontSizeByWindowWidth(10),
            color:COLOR.TEXT
        }}>{transaction.description}</Text>
        <View style={{
            flexDirection:"row",
        }}>
        <DatePicker
        date={date}
        setDate={setDate}
        />
        <View style={{
            backgroundColor:"white"
        }}>
            <Text>General</Text>
        </View>
        </View>
        <Text style={{
            color:COLOR.TEXT
        }}>Create By {user._id==transaction.creator._id?"You":transaction.creator.name}</Text>
        </View>
      <View style={styles.boxContainer}>
        <View style={{ borderTopLeftRadius: calcWidth(5), // Adjust this value to set the curve radius
    borderTopRightRadius: calcWidth(5),
    backgroundColor:COLOR.BUTTON
    }}>
      <Text style={styles.headerLabel}>Paid by</Text>
      </View>
        <View style={styles.headerContainer}>
          <View style={styles.userDetail}>
            <View style={[styles.circle, { backgroundColor: generateRandomColor() }]} />
            <Text style={styles.userName}>{user._id==transaction.paidBy._id?"You":transaction.creator.name}</Text>
            <Text style={styles.userAmount}>$ {transaction.amount}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.sharedLabel}>Shared with</Text>
          <View styles={styles.sharedContainer}>
          {transaction.splitAmong.map(({user,amount}, index) => (
            <View key={user._id} style={styles.sharedDetail}>
              <View style={[styles.circle, { backgroundColor: generateRandomColor() }]} />
              <Text style={styles.sharedUser}>{user.name||"Anonymous"}</Text>
              <Text style={styles.sharedAmount}>$ {parseInt(amount)}</Text>
            </View>
          ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.APP_BACKGROUND,
  },
  boxContainer: {
    backgroundColor: COLOR.PAYMENT_BACKGROUND,
    margin:calcWidth(5)
  },
  sharedContainer:{
    // margin:calcWidth(5),
  },
  headerContainer: {
    padding: calcWidth(2),
  },
  headerLabel: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(12),
    
    padding:calcWidth(3)
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: calcWidth(5),
  },
  circle: {
    width: calcWidth(5),
    height: calcWidth(5),
    borderRadius: calcWidth(5) / 2,
    marginRight: calcWidth(2),
  },
  userName: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(14),
  },
  userAmount: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  sharedLabel: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(14),
    padding: calcWidth(2),
    backgroundColor:COLOR.BUTTON
  },
  sharedDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(1),
    marginHorizontal: calcWidth(5),
  },
  sharedUser: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(14),
    marginLeft: calcWidth(7), // Adjust so the name aligns with the circle
  },
  sharedAmount: {
    color: COLOR.TEXT,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
});

export default TransactionDetail;
