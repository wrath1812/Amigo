import { StyleSheet, View, Pressable, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { Octicons, EvilIcons } from '@expo/vector-icons';
import { useAuth } from '../stores/auth';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import editNames from '../helper/editNames';
import UserAvatar from '../components/UserAvatar';

function convertToCustomFormat(dateString) {
    var date = new Date(dateString);
    var dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    var timeOptions = { hour: '2-digit', minute: '2-digit' };
    var formattedDate = date.toLocaleDateString('en-IN', dateOptions);
    var formattedTime = date.toLocaleTimeString('en-IN', timeOptions);
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

    var day = date.getDate();
    var month = months[date.getMonth()];
    return day + ' ' + month;
}

function ActivityHeader({ icon, iconName, size, text }) {
    return (
        <View style={styles.header}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: calcWidth(2),
                }}
            >
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
            </View>
            <Text style={styles.headerText}>
                {icon &&
                    React.createElement(icon, {
                        name: iconName,
                        size: size,
                        color: 'white',
                    })}
                {'    '}
                {text}
            </Text>
        </View>
    );
}

function TransactionActivity({ transaction, createdAt, contacts }) {
    const { user } = useAuth();
    const navigation = useNavigation();
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
                size={calcHeight(1.8)}
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
                <View
                    style={{
                        flexDirection: 'row',
                        gap: calcWidth(2),
                    }}
                >
                    <EvilIcons
                        name="calendar"
                        size={calcWidth(5)}
                        color="white"
                    />
                    <Text style={styles.description}>
                        {getDateAndMonth(createdAt)}
                    </Text>
                </View>
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
        <View
            style={{
                gap: calcHeight(2),
            }}
        >
            <Text style={styles.description}>
                {payer.name} paid {receiver.name}
            </Text>
            <Text style={styles.amount}>₹ {payment.amount}</Text>
        </View>
    );
}

function ChatActivity({ chat,synched }) {
    return (
        <View>
            <Text
                style={{
                    color: 'white',
                }}
            >
                {chat.message}
                {synched==="false"&&"sd"}
            </Text>
        </View>
    );
}

function Feed(props) {
    const { user } = useAuth();
    const { creator, activityType } = props;

    const renderActivity = () => {
        const activityStrategy = ActivityStrategyFactory(activityType);
        if (activityStrategy) {
            return activityStrategy.renderActivity(props);
        }
        return null;
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
            {user._id !== creator._id && <UserAvatar user={creator} />}
            <View
                style={{
                    marginLeft: user._id === creator._id ? 0 : calcWidth(2),
                }}
            >
                {user._id !== creator._id && (
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                color: COLOR.BUTTON,
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
                                    ? '#663CAB'
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

const ActivityStrategyFactory = (activityType) => {
    switch (activityType) {
        case 'transaction':
            return {
                renderActivity: ({
                    relatedId: transaction,
                    createdAt,
                    contacts,
                }) => (
                    <TransactionActivity
                        transaction={transaction}
                        createdAt={createdAt}
                        contacts={contacts}
                    />
                ),
            };
        case 'payment':
            return {
                renderActivity: ({ relatedId: payment, contacts }) => (
                    <PaymentActivity payment={payment} contacts={contacts} />
                ),
            };
        case 'chat':
            return {
                renderActivity: ({
                    creator,
                    relatedId,
                    createdAt,
                    synched
                }) => (
                    <ChatActivity
                        chat={{
                            creator,
                            message: relatedId.message,
                            createdAt,
                        }}
                        synched={synched}
                    />
                ),
            };
        default:
            return null;
    }
};

const styles = StyleSheet.create({
    transactionContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: calcWidth(3),
        marginVertical: calcHeight(4),
    },
    transactionCard: {
        padding: calcWidth(5),
        width: calcWidth(70),
        backgroundColor: '#342F4F',
        borderBottomLeftRadius: calcHeight(1),
        borderBottomRightRadius: calcHeight(1),
        marginTop: calcHeight(1),
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
        marginLeft: calcWidth(2),
    },
    createdAt: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        marginTop: calcHeight(2),
    },
});

export default Feed;
