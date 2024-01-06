import React, { useCallback, useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    FlatList,
    Pressable,
    Image,
} from 'react-native';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import EmptyScreen from '../components/EmptyScreen';
import NoBalance from '../assets/NoBalance.png';
import GroupBalanceCard from '../components/GroupBalanceCard';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import ScanIcon from '../assets/icons/scan.png';
import plusIconStyle from '../constants/plusIconStyle';
import { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Search from '../components/Search';
import tabBarStyle from '../constants/tabBarStyle';

const headerIconSize = 6;

/**
 * Groups data items by their group ID and name.
 * @param {Array} dataItems - Array of data items to be grouped.
 * @returns {Array} An array of grouped data items.
 */
function groupDataItemsByGroup(dataItems) {
    const groups = {};

    dataItems.forEach((item) => {
        const groupId = item.group._id.toString();

        if (!groups[groupId]) {
            groups[groupId] = {
                _id: item.group._id,
                name: item.group.name,
                documents: [],
            };
        }

        groups[groupId].documents.push({
            _id: item._id,
            lender: item.lender,
            borrower: item.borrower,
            amount: item.amount,
            // Additional fields can be added as needed
        });
    });

    return Object.values(groups);
}

/**
 * Calculates the total balance for a user within each group.
 * @param {Object} group - Group object containing documents.
 * @param {string} userId - User ID for balance calculation.
 * @returns {Object} An object containing balance details for the user within the group.
 */
function calculateUserBalanceInGroup(group, userId) {
    let borrowers = [];
    let lenders = [];
    let borrowerCount = 0;
    let lenderCount = 0;
    let totalBalance = 0;

    group.documents.forEach((document) => {
        if (document.lender._id === userId) {
            borrowers.push({
                name: document.borrower.name,
                _id: document.borrower._id,
                amount: document.amount,
                phoneNumber:document.borrower.phoneNumber
            });
            totalBalance += document.amount;
            borrowerCount++;
        } else if (document.borrower._id === userId) {
            lenders.push({
                name: document.lender.name,
                _id: document.lender._id,
                amount: document.amount,
                phoneNumber:document.lender.phoneNumber
            });
            totalBalance -= document.amount;
            lenderCount++;
        }
    });

    return {
        borrowers,
        lenders,
        borrowerCount,
        lenderCount,
        totalBalance,
        name: group.name,
        _id: group._id,
    };
}

/**
 * Groups balances by group and calculates the total balance for a specific user.
 * @param {Array} balances - Array of balance objects to group.
 * @param {string} userId - ID of the user for whom to calculate the total balance.
 * @returns {Object} An object containing grouped balances and the user's total balance.
 */
function groupBalancesAndCalculateTotal(balances, userId) {
    const groupedBalances = groupDataItemsByGroup(balances);
    let userTotalBalance = 0;
    const userGroups = [];

    groupedBalances.forEach((group) => {
        const groupBalanceDetails = calculateUserBalanceInGroup(group, userId);
        userGroups.push(groupBalanceDetails);
        userTotalBalance += groupBalanceDetails.totalBalance;
    });

    return { groups: userGroups, userTotalBalance };
}

function BalanceScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState([]);
    const [balance, setBalance] = useState(0);
    const { user } = useAuth();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // Show the tab bar when this screen is focused
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'flex', ...tabBarStyle },
            });
        } else {
            // Optional: Hide the tab bar when this screen is not focused
            // You can remove this part if you only want to show the tab bar in this screen
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
        }
    }, [isFocused, navigation]);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                const { data } = await apiHelper('/balance');
                const { groups, userTotalBalance } =
                    groupBalancesAndCalculateTotal(data, user._id);

                setBalance(parseInt(userTotalBalance));
                setBalances(groups);
                setLoading(false);
            })();
        }, []),
    );

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: calcWidth(headerIconSize),
                }}
            >
                <Pressable onPress={() => navigation.navigate(PAGES.SCANNER)}>
                    <Image
                        source={ScanIcon}
                        style={{
                            width: calcWidth(headerIconSize),
                            height: calcWidth(headerIconSize),
                        }}
                    />
                </Pressable>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable
                        onPress={() => navigation.navigate(PAGES.SEARCH)}
                    >
                        <Ionicons
                            name="search"
                            size={calcWidth(headerIconSize)}
                            color="white"
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate(PAGES.ACCOUNT);
                        }}
                    >
                        <Image
                            source={{ uri: 'https://t.ly/Rel6Z' }}
                            style={{
                                width: calcWidth(headerIconSize),
                                height: calcWidth(headerIconSize),
                                borderRadius: calcWidth(headerIconSize),
                                marginLeft: calcWidth(headerIconSize),
                            }}
                        />
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    padding: calcWidth(2),
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: COLOR.BUTTON,
                        padding: calcHeight(2),
                        borderRadius: 10,
                        justifyContent: 'space-between',
                        marginTop: calcHeight(1),
                    }}
                >
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontWeight: 'bold',
                        }}
                    >
                        Total Balance
                    </Text>
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontWeight: 'bold',
                        }}
                    >
                        ₹ {balance}
                    </Text>
                </View>
            </View>
            {balances.length == 0 ? (
                <EmptyScreen
                    onPress={() => {
                        navigation.navigate(PAGES.ADD_TRANSACTION);
                    }}
                    image={NoBalance}
                    title="No Transactions Yet"
                />
            ) : (
                <FlatList
                    data={balances}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GroupBalanceCard group={item} />}
                    style={{
                        marginTop: calcHeight(5),
                    }}
                />
            )}
            {balances.length != 0 && (
                <FabIcon
                    onPress={() => {
                        navigation.navigate(PAGES.ADD_TRANSACTION);
                    }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        alignContent: 'left',
        padding: calcWidth(3),
    },
    groupName: {
        fontSize: 16,
        marginVertical: 5, // Add margin for better spacing
    },
    group: {
        flexDirection: 'row',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: 10,
        margin: calcHeight(2),
        marginBottom: calcHeight(5),
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
});

export default BalanceScreen;
