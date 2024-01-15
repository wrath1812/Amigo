import { StyleSheet, View, Pressable, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { Octicons, EvilIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import GroupIcon from './GroupIcon';
import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import editNames from '../helper/editNames';

function convertToCustomFormat(dateString) {
    // Parse the date string into a Date object
    var date = new Date(dateString);

    // Options for the date format
    var dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    var timeOptions = { hour: '2-digit', minute: '2-digit' };

    // Convert the date to the desired format
    var formattedDate = date.toLocaleDateString('en-IN', dateOptions);
    var formattedTime = date.toLocaleTimeString('en-IN', timeOptions);

    // Combine the formatted date and time
    return formattedDate + ' ' + formattedTime;
}

function getDateAndMonth(dateString) {
    // Parse the dateString into a Date object
    var date = new Date(dateString);

    // Array of month names
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Get the day and month from the date
    var day = date.getDate(); // Day as a number (1-31)
    var month = months[date.getMonth()]; // Month as a full name

    // Format and return the date as "8 February"
    return day + ' ' + month;
}

function ActivityHeader({ icon, iconName, size, text }) {
    return (
        <View style={styles.header}>
            <View
                style={{
                    borderWidth: 1,
                    padding: calcWidth(1),
                    borderRadius: calcWidth(5),
                    borderColor: 'white',
                }}
            >
                <MaterialIcons
                    name="call-split"
                    size={calcWidth(3)}
                    color="white"
                />
            </View>
            <Text
                style={{
                    fontSize: getFontSizeByWindowWidth(10),
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                Split an expense
            </Text>
            <Text style={styles.headerText}>
                {icon &&
                    React.createElement(icon, {
                        name: iconName,
                        size: size,
                        color: 'white',
                    })}{' '}
                {text}
            </Text>
        </View>
    );
}

function TransactionActivity({ transaction, navigation, createdAt, contacts }) {
    const { user } = useAuth();
    return (
        <Pressable
            onPress={() => {
                const editedTransaction = transaction;
                for (let i in editedTransaction.splitAmong) {
                    editedTransaction.splitAmong[i].user = editNames(
                        [transaction.splitAmong[i].user],
                        user._id,
                        contacts,
                    )[0];
                }
                editedTransaction.paidBy = editNames(
                    [transaction.paidBy],
                    user._id,
                    contacts,
                )[0];
                navigation.navigate(PAGES.TRANSACTION_DETAIL, {
                    transaction: editedTransaction,
                });
            }}
        >
            <ActivityHeader
                icon={Octicons}
                iconName="person"
                size={calcHeight(2)}
                text={`${transaction.splitAmong?.length}`}
            />
            <View style={styles.flexContainer}>
                <Text style={styles.amount}>₹</Text>
                <View>
                    <Text style={styles.amount}>{transaction.amount}</Text>
                    <Text style={styles.description}>
                        {transaction.description}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: calcHeight(3),
                }}
            >
                <EvilIcons name="calendar" size={calcWidth(5)} color="white" />
                <Text style={styles.description}>
                    {getDateAndMonth(createdAt)}
                </Text>
                <Text style={styles.description}>
                    Created By{' '}
                    {
                        editNames([transaction.creator], user._id, contacts)[0]
                            .name
                    }
                </Text>
            </View>
        </Pressable>
    );
}

function PaymentActivity({ payment, contacts }) {
    const { user } = useAuth();
    const [payer, receiver] = editNames(
        [payment.payer, payment.receiver],
        user._id,
        contacts,
    );
    return (
        <View>
            <Text style={styles.description}>
                {payer.name} paid {receiver.name}
            </Text>
            <Text style={styles.amount}>₹ {payment.amount}</Text>
        </View>
    );
}

function ChatActivity({ chat }) {
    return (
        <View>
            <Text
                style={{
                    color: 'white',
                }}
            >
                {chat.message}
            </Text>
        </View>
    );
}

function Feed({ creator, createdAt, relatedId, activityType, contacts }) {
    const navigation = useNavigation();
    const { user } = useAuth();
    const renderActivity = () => {
        switch (activityType) {
            case 'transaction':
                return (
                    <TransactionActivity
                        transaction={relatedId}
                        navigation={navigation}
                        createdAt={createdAt}
                        contacts={contacts}
                    />
                );
            case 'payment':
                return (
                    <PaymentActivity payment={relatedId} contacts={contacts} />
                );
            case 'chat':
                return (
                    <ChatActivity
                        chat={{
                            creator,
                            message: relatedId.message,
                            createdAt,
                        }}
                        contacts={contacts}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View
            style={[
                styles.transactionContainer,
                {
                    justifyContent:
                        user._id === creator._id ? 'flex-end' : 'flex-start',
                },
            ]}
        >
            {user._id !== creator._id && (
                <View>
                    <GroupIcon />
                </View>
            )}
            <View>
                {user._id !== creator._id && (
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                color: '#8740FD',
                            }}
                        >
                            {' '}
                            {creator.name}
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                            }}
                        >
                            {' '}
                            {convertToCustomFormat(createdAt)}
                        </Text>
                    </View>
                )}
                <View
                    style={[
                        styles.transactionCard,
                        {
                            backgroundColor:
                                user._id === creator._id
                                    ? "#663CAB"
                                    : '#342F4F',
                            borderRadius:
                                user._id === creator._id
                                    ? 'topLeft'
                                    : 'topRight',
                        },
                    ]}
                >
                    {renderActivity()}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    transactionContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: calcWidth(3),
    },
    transactionCard: {
        padding: calcWidth(5),
        width: calcWidth(70),
        backgroundColor: '#342F4F',
        margin: calcWidth(2),
        marginVertical: calcHeight(3),
        borderBottomLeftRadius: calcHeight(1),
        borderBottomRightRadius: calcHeight(1),
    },
    description: {
        fontSize: getFontSizeByWindowWidth(10),
        color: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        marginLeft: calcWidth(5),
    },
    amount: {
        fontSize: getFontSizeByWindowWidth(20),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        marginRight: calcWidth(2),
    },
    flexContainer: {
        flexDirection: 'row',
        marginTop: calcHeight(3),
    },
    createdAt: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        marginTop: calcHeight(2),
    },
});

export default Feed;
