// 1. Import Statements
import React, { useRef, useState, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Pressable,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import LoginIcon from '../assets/Login.png';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth } from '../helper/res';
import { getFontSizeByWindowWidth } from '../helper/res';
import { useTransaction } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import getNamesFromContacts from '../helper/getNamesFromContacts';
import Feed from '../components/Feed';
import useSocket from '../hooks/useSocket';
import { Feather } from '@expo/vector-icons';
import editNames from '../helper/editNames';
import { useGroup } from '../context/GroupContext';
import groupBalancesAndCalculateTotal from "../helper/groupBalancesAndCalculateTotal";
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

function isNumber(text) {
    return !isNaN(+text);
}

function GroupScreen({ navigation }) {
    const { group,setGroup } = useGroup();
    const textRef = useRef();
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setTransactionData, resetTransaction } = useTransaction();
    const [amount, setAmount] = useState('');
    const [contacts, setContacts] = useState([]);
    const { user } = useAuth();
    const [totalBalance,setTotalBalance]=useState();

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper(
                `/activity-feed?groupId=${group._id}`,
            );
            const contactsData = await getNamesFromContacts();
            setContacts(contactsData);
            for (let activity of data)
                editNames([activity.creator], user._id, contactsData);
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
        setIsLoading(false);
    }, [group]);

    const fetchActivity = useCallback(async (activity) => {
        if (activity.creator._id == user._id) return;
        editNames([activity.creator], user._id, contacts);
        setActivities((prev) => [activity, ...prev]);
    }, []);

    const fetchBalances=useCallback(async () => {
        try {
            const { data } = await apiHelper(
                `/balance?id=${group._id}`,
            );
            if(data.length==0)
            return;
            const { groups }=await groupBalancesAndCalculateTotal(data, user._id);
            setTotalBalance(groups[0].totalBalance)
            setGroup((prev)=>({
                ...prev,
                ...groups[0]
            }));
            
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    },[navigation]);

    useFocusEffect(fetchActivities);
    useFocusEffect(fetchBalances);
    useSocket('activity created', fetchActivity);

    async function addChat() {
        setActivities((prev) => [
            {
                activityType: 'chat',
                createdAt: Date(),
                creator: {
                    _id: user._id,
                    name: user.name,
                },
                group: group._id,
                onModel: 'Chat',
                relatedId: {
                    message: amount,
                },
            },
            ...prev,
        ]);
        setAmount('');
        const { data } = await apiHelper.post(`/group/${group._id}/chat`, {
            message: amount,
        });
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={styles.header}
                onPress={() => {
                    navigation.navigate(PAGES.GROUP_SETTINGS);
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: calcHeight(8),
                        gap: calcWidth(5),
                    }}
                >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="chevron-back"
                            size={calcHeight(3)}
                            color="white"
                        />
                    </Pressable>
                    <GroupIcon groupId={group._id} />
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupMembers}>
                            {getMembersString(group.members)}
                        </Text>
                    </View>
                </View>
                <Pressable
                    onPress={() => {
                        setTransactionData((prev) => ({
                            ...prev,
                            group,
                        }));
                        navigation.navigate(PAGES.SCANNER);
                    }}
                >
                    <AntDesign
                        name="scan1"
                        size={24}
                        color="white"
                        style={{
                            marginRight: calcWidth(5),
                        }}
                    />
                </Pressable>
            </Pressable>
            <Pressable style={styles.balanceInfo} 
            onPress={()=>{
                navigation.navigate(PAGES.GROUP_BALANCE, { group })
            }
            }
            >
                <View style={styles.balanceInfoLeft}>
                    <View
                        style={[
                            styles.indicator,
                            {
                                backgroundColor:
                                    totalBalance > 0 ? '#00C83D' : 'red',
                            },
                        ]}
                    />
                    <View style={styles.balanceTextContainer}>
                        <Text style={styles.balanceText}>
                            Total Split Balance
                        </Text>
                        <Text style={styles.subBalanceText}>
                            {totalBalance< 0
                                ? 'you owe'
                                : 'you get back'}
                        </Text>
                    </View>
                </View>
                <View style={styles.balanceAmountContainer}>
                    <Text style={styles.balanceAmount}>
                        ₹{totalBalance}
                    </Text>
                    <View style={styles.arrowIconContainer}>
                        <Feather
                            name={
                                totalBalance > 0
                                    ? 'arrow-up-right'
                                    : 'arrow-down-left'
                            }
                            size={calcWidth(2)}
                            color="white"
                        />
                    </View>
                </View>
            </Pressable>
            <FlatList
                inverted
                data={activities}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Feed {...item} contacts={contacts} />
                )}
                style={{
                    height: calcHeight(65),
                }}
            />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: calcWidth(2),
                    justifyContent: 'space-evenly',
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={calcHeight(9)}
            >
                <Pressable
                    style={[
                        styles.inputContainer,
                        {
                            width: isNumber(amount)
                                ? calcWidth(60)
                                : calcWidth(75),
                        },
                    ]}
                    onPress={() => textRef.current.focus()}
                >
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        ref={textRef}
                        placeholder="Enter the amount"
                        textAlign="center"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </Pressable>
                {isNumber(amount) ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setAmount('');
                            resetTransaction();
                            setTransactionData((prev) => ({
                                ...prev,
                                group,
                                amount,
                            }));
                            navigation.navigate(PAGES.ADD_TRANSACTION);
                        }}
                    >
                        <Text style={styles.buttonText}>+ Expense</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={addChat}>
                        <AntDesign
                            name="enter"
                            size={calcHeight(4)}
                            color={COLOR.BUTTON}
                        />
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupNameContainer: {
        // marginLeft: calcWidth(5),
    },
    groupName: {
        color: 'white',
        fontWeight: 'bold',
    },
    groupMembers: {
        color: '#A5A5A5',
    },
    button: {
        width: calcWidth(25),
        height: calcHeight(5),
        borderRadius: 10,
        backgroundColor: COLOR.BUTTON,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        alignItems: 'center',
    },
    inputContainer: {
        color: 'white',
        width: calcWidth(60),
        height: calcHeight(5),
        alignContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'white',
        fontSize: getFontSizeByWindowWidth(10),
    },
    balanceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: calcHeight(1),
    },
    balanceInfoLeft: {
        flexDirection: 'row',
    },
    indicator: {
        width: calcWidth(1),
        borderTopRightRadius: calcWidth(3),
        borderBottomRightRadius: calcWidth(3),
        flex: 1,
    },
    balanceTextContainer: {
        marginLeft: calcHeight(3),
    },
    balanceAmountContainer: {
        marginRight: calcWidth(5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowIconContainer: {
        marginLeft: calcWidth(2),
        padding: calcWidth(0.1),
        backgroundColor: '#00C83D',
        borderRadius: calcWidth(2),
    },
    balanceText: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(12),
        fontWeight: 'bold',
    },
    subBalanceText: {
        color: '#7F7F7F',
        fontSize: getFontSizeByWindowWidth(8),
    },
    balanceAmount: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(12),
        fontWeight: 'bold',
    },
});


// 9. Export Statement
export default GroupScreen;
