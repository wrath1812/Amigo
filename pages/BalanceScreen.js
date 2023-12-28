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
import { AntDesign } from '@expo/vector-icons';

function groupByGroup(balances, userId) {
    const groupMap = new Map();

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

        // Process the lender
        if (!group.lenders.has(balance.lender._id)) {
            group.lenders.set(balance.lender._id, {
                name: balance.lender.name,
                id: balance.lender._id,
                amount: 0,
            });
        }
        group.lenders.get(balance.lender._id).amount += amount;

        // Process the borrower
        if (!group.borrowers.has(balance.borrower._id)) {
            group.borrowers.set(balance.borrower._id, {
                name: balance.borrower.name,
                id: balance.borrower._id,
                amount: 0,
            });
        }
        group.borrowers.get(balance.borrower._id).amount += amount;

        // Accumulate the total balance
        group.totalBalance += amount;
    });

    // Convert the map to the desired array structure
    return Array.from(groupMap.values()).map((group) => ({
        name: group.name,
        id: group.id,
        lenderNumber: group.lenders.size,
        borrowerNumber: group.borrowers.size,
        totalBalance: group.totalBalance,
        lenders: Array.from(group.lenders.values()),
        borrowers: Array.from(group.borrowers.values()),
    }));
}

function BalanceScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            marginBottom: calcHeight(5),
                            marginRight: calcWidth(2),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <AntDesign
                            name="search1"
                            size={calcWidth(10)}
                            color="white"
                            style={{
                                marginRight: calcWidth(5),
                            }}
                        />

                        <Image
                            source={{ uri: 'https://t.ly/Rel6Z' }}
                            style={{
                                width: calcWidth(10),
                                height: calcWidth(10),
                                borderRadius: calcWidth(10),
                            }}
                        />
                    </View>
                </View>
            ),
            headerLeft: () => (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            marginBottom: calcHeight(1),
                        }}
                    >
                        <AntDesign
                            name="scan1"
                            size={calcWidth(5)}
                            color="white"
                            style={{
                                marginRight: calcWidth(5),
                            }}
                        />
                    </View>
                </View>
            ),
        });
    }, [navigation]);

    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState([]);
    const { user } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                const { data } = await apiHelper('/balance');
                const computedBalances = groupByGroup(data, user.id);
                setBalances(computedBalances);
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
                        $ 0
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
