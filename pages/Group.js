// 1. Import Statements
import React, { useRef, useState, useCallback, useEffect } from 'react';
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
    Image,
    ImageBackground,
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
import { useAuth } from '../stores/auth';
import getNamesFromContacts from '../helper/getNamesFromContacts';
import Feed from '../components/Feed';
import useSocket from '../hooks/useSocket';
import editNames from '../helper/editNames';
import { useGroup } from '../context/GroupContext';
import groupBalancesAndCalculateTotal from '../utility/groupBalancesAndCalculateTotal';
import getMembersString from '../utility/getMembersString';
import sliceText from '../helper/sliceText';
import ScannerIcon from '../assets/icons/scanner.png';
import BalanceGroupPin from '../components/BalanceGroupPin';
import ChatBackground from '../assets/chatBackground.png';

function isNumber(text) {
    return !isNaN(+text);
}

function GroupScreen({ navigation }) {
    const { group } = useGroup();
    const textRef = useRef();
    const [activities, setActivities] = useState([]);
    const { setTransactionData, resetTransaction } = useTransaction();
    const [amount, setAmount] = useState('');
    const [contacts, setContacts] = useState([]);
    const { user } = useAuth();
    const [totalBalance, setTotalBalance] = useState();
    const [balances, setBalances] = useState();
    const fetchActivities = useCallback(async () => {
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
    }, [group]);

    const fetchActivity = useCallback(async (activity) => {
        if (activity.creator == user._id) return;
        editNames([activity.creator], user._id, contacts);
        setActivities((prev) => [activity, ...prev]);
    }, []);

    const fetchBalances = useCallback(async () => {
        try {
            const { data } = await apiHelper(`/balance/${group._id}`);
            if (data.length == 0) {
                setTotalBalance(0);
                return;
            }
            const { groups } = await groupBalancesAndCalculateTotal(
                data,
                user._id,
            );
            setTotalBalance(groups[0].totalBalance);
            setBalances(groups[0]);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }, []);

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

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={styles.header}
                onPress={() => {
                    navigation.navigate(PAGES.GROUP_SETTINGS, {
                        balance: totalBalance != 0,
                    });
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
                        <Text style={styles.groupName}>
                            {sliceText(group.name, 25)}
                        </Text>
                        <Text style={styles.groupMembers}>
                            {getMembersString(group.members, 20)}
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
                    <Image
                        source={ScannerIcon}
                        style={{
                            width: calcHeight(3),
                            height: calcHeight(3),
                            marginRight: calcWidth(5),
                        }}
                    />
                </Pressable>
            </Pressable>

            <BalanceGroupPin totalBalance={totalBalance} balances={balances} />
            <FlatList
                inverted
                data={activities}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Feed {...item} contacts={contacts} />
                )}
                style={{
                    height: calcHeight(totalBalance != 0 ? 65 : 70),
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
                    <TouchableOpacity
                        onPress={addChat}
                        style={{
                            height: calcHeight(5),
                            justifyContent: 'center',
                        }}
                    >
                        <AntDesign
                            name="enter"
                            size={calcHeight(4)}
                            color={COLOR.BUTTON}
                        />
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
            <Image
                source={ChatBackground}
                style={{
                    position: 'absolute',
                    zIndex: -100,
                    height:calcHeight(85),
                    bottom:0
                }}
            />
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
});

// 9. Export Statement
export default GroupScreen;
