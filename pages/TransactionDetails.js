import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import COLOR from '../constants/Colors';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import { useAuth } from '../context/AuthContext';
import { getCategoryIcon } from '../constants/Categories';
import apiHelper from '../helper/apiHelper';
import useCustomColor from '../hooks/useCustomColor';
import formatDateToDDMMYYYY from '../helper/formatDateToDDMMYYYY';


const SharedItem = ({ user, amount, generateColor }) => {
    return (
      <View style={styles.sharedDetail}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: generateColor(user._id),
            },
          ]}
        />
        <Text style={styles.sharedUser}>{user.name}</Text>
        <Text style={styles.sharedAmount}>₹ {parseInt(amount)}</Text>
      </View>
    );
  };
  
  const SharedList = ({ transaction, generateColor }) => {
    const visibleUsers = transaction.splitAmong.slice(0, 6); // Display only the first 5 users
  
    return (
      <View>
        <Text style={styles.sharedLabel}>Shared with</Text>
        <View style={styles.sharedContainer}>
          <FlatList
            data={visibleUsers}
            keyExtractor={(item) => item.user._id}
            renderItem={({ item, index }) => (
              <SharedItem
                user={item.user}
                amount={item.amount}
                generateColor={generateColor}
              />
            )}
          />
          {transaction.splitAmong.length > 6 && (
            <TouchableOpacity
              style={styles.sharedDetail}
              onPress={() => {
                // Handle the click event to expand and show all users
                // You can implement this logic based on your requirements
              }}
            >
              <Text style={styles.sharedUser}>
                +{transaction.splitAmong.length - 5}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  const TransactionDetail = ({
    navigation,
    route: {
      params: { transaction },
    },
  }) => {
    const { user } = useAuth();
    const [date, setDate] = useState(new Date(transaction.date));
  
    const generateColor = useCustomColor();
  
    const handleDeleteTransaction = async () => {
      Alert.alert(
        'Delete Transaction',
        'Are you sure you want to delete this transaction?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                await apiHelper.delete(`transaction/${transaction._id}`);
                navigation.goBack();
              } catch (error) {
                // Handle errors
                console.log(
                  'An error occurred while deleting the transaction.'
                );
              }
            },
          },
        ],
        { cancelable: false }
      );
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity onPress={handleDeleteTransaction}>
              <AntDesign
                name="delete"
                size={calcWidth(6)}
                color={COLOR.BUTTON}
              />
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation]);
  
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: getFontSizeByWindowWidth(50),
              color: COLOR.TEXT,
              fontWeight: 'bold',
              marginTop: calcHeight(5),
            }}
          >
            ₹ {transaction.amount}
          </Text>
          <Text
            style={{
              fontSize: getFontSizeByWindowWidth(15),
              color: COLOR.TEXT,
            }}
          >
            {transaction.description}
          </Text>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: calcHeight(3),
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: 10,
                padding: calcWidth(1),
              }}
            >
              <Text>{formatDateToDDMMYYYY(date)}</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: 10,
                padding: calcWidth(0.5),
              }}
            >
              {getCategoryIcon(transaction.type)}
              <Text>{transaction.type}</Text>
            </View>
          </View>
          <Text
            style={{
              color: COLOR.TEXT,
            }}
          >
            Create By {transaction.creator.name}
          </Text>
        </View>
        <View style={styles.boxContainer}>
          <View
            style={{
              borderTopLeftRadius: calcWidth(5),
              borderTopRightRadius: calcWidth(5),
              backgroundColor: COLOR.BUTTON,
            }}
          >
            <Text style={styles.headerLabel}>Paid by</Text>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.userDetail}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: generateColor(transaction.paidBy._id),
                  },
                ]}
              />
              <Text style={styles.userName}>{transaction.paidBy.name}</Text>
              <Text style={styles.userAmount}>₹ {transaction.amount}</Text>
            </View>
          </View>
          <SharedList transaction={transaction} generateColor={generateColor} />
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
        margin: calcWidth(5),
    },
    centeredView: {
        alignItems: 'center',
    },
    amountText: {
        fontSize: getFontSizeByWindowWidth(25),
        color: COLOR.TEXT,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: getFontSizeByWindowWidth(10),
        color: COLOR.TEXT,
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    createdByText: {
        color: COLOR.TEXT,
    },
    header: {
        borderTopLeftRadius: calcWidth(5),
        borderTopRightRadius: calcWidth(5),
        backgroundColor: COLOR.BUTTON,
    },
    userDetailContainer: {
        padding: calcWidth(2),
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
        backgroundColor: COLOR.BUTTON,
    },
    sharedContainer: {},
    sharedDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: calcHeight(1),
        marginHorizontal: calcWidth(5),
    },
    sharedUser: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
    },
    sharedAmount: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    headerLabel: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(12),
        padding: calcWidth(3),
    },
});

export default TransactionDetail;
