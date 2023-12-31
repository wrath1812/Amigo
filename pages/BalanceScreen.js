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
function groupByGroup(balances, userId) {
    const groupMap = new Map();
    let userTotalBalance = 0;

    balances.forEach((balance) => {
        const groupId = balance.group._id;
        const groupName = balance.group.name;
        const amount = balance.amount;

        // Initialize group data in the map if not existing
        if (!groupMap.has(groupId)) {
            groupMap.set(groupId, {
                name: groupName,
                id: groupId,
                lenders: new Map(),
                borrowers: new Map(),
                totalBalance: 0,
            });
        }

        const group = groupMap.get(groupId);


        if(balance.borrower_id==userId){
        // Process the lender
        if (!group.lenders.has(balance.lender._id)) {
            group.lenders.set(balance.lender._id, {
                name: balance.lender.name,
                id: balance.lender._id,
                amount: 0,
            });
        }
        group.lenders.get(balance.lender._id).amount += amount;
        group.totalBalance -= amount;

        userTotalBalance -= amount;
    }
    else{

        // Process the borrower
        if (!group.borrowers.has(balance.borrower._id)) {
            group.borrowers.set(balance.borrower._id, {
                name: balance.borrower.name,
                id: balance.borrower._id,
                amount: 0,
            });
        }
        group.borrowers.get(balance.borrower._id).amount += amount;
        group.totalBalance += amount;

        userTotalBalance += amount;
    }
        // Accumulate the total balance
    });

    // Convert the map to the desired array structure
    const groupsArray = Array.from(groupMap.values()).map((group) => ({
        name: group.name,
        id: group.id,
        lenderNumber: group.lenders.size,
        borrowerNumber: group.borrowers.size,
        totalBalance: group.totalBalance,
        lenders: Array.from(group.lenders.values()),
        borrowers: Array.from(group.borrowers.values()),
    }));

    return { groups: groupsArray, userTotalBalance };
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
                const { groups, userTotalBalance } = groupByGroup(
                    data,
                    user.id,
                );
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
                <View>
                    <Image
                        source={ScanIcon}
                        style={{
                            width: calcWidth(headerIconSize),
                            height: calcWidth(headerIconSize),
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Ionicons
                        name="search"
                        size={calcWidth(headerIconSize)}
                        color="white"
                    />

                    <Image
                        source={{ uri: 'https://t.ly/Rel6Z' }}
                        style={{
                            width: calcWidth(headerIconSize),
                            height: calcWidth(headerIconSize),
                            borderRadius: calcWidth(headerIconSize),
                            marginLeft: calcWidth(headerIconSize),
                        }}
                    />
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
                        $ {balance}
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
