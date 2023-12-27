import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, FlatList,Pressable } from 'react-native';
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
function groupByGroup(balances) {
    const groupMap = new Map();

    balances.forEach(balance => {
        const groupId = balance.group._id;
        const groupName = balance.group.name;
        const amount = balance.amount;

        // If the group is not yet in the map, initialize it
        if (!groupMap.has(groupId)) {
            groupMap.set(groupId, {
                name: groupName,
                id: groupId,
                lenderBorrowerSet: new Set(),
                totalBalance: 0,
                lenderBorrowerDetails: []
            });
        }

        const group = groupMap.get(groupId);

        // Add the lender and borrower IDs to the set to count unique occurrences
        group.lenderBorrowerSet.add(balance.lender._id);
        group.lenderBorrowerSet.add(balance.borrower._id);

        // Accumulate the balance and add lender and borrower details
        group.totalBalance += amount;
        group.lenderBorrowerDetails.push({ 
            name: balance.lender.name, 
            id: balance.lender._id, 
            amount: amount 
        });
        group.lenderBorrowerDetails.push({ 
            name: balance.borrower.name, 
            id: balance.borrower._id, 
            amount: amount 
        });
    });

    // Convert the map to the desired array structure
    return Array.from(groupMap.values()).map(group => ({
        name: group.name,
        id: group.id,
        lenderNumberBorrowerNumber: group.lenderBorrowerSet.size,
        totalBalance: group.totalBalance,
        lenderBorrower: group.lenderBorrowerDetails
    }));
}



function BalanceScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState([]);
    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                const { data } = await apiHelper('/balance');
                const computedBalances=groupByGroup(data);
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
                {balances.length == 0 ?(
                    <EmptyScreen
                        onPress={() => {
                            navigation.navigate(PAGES.ADD_TRANSACTION);
                        }}
                        image={NoBalance}
                        title="No Transactions Yet"
                    />
                ):
                <FlatList
                data={balances}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <GroupBalanceCard group={item}/>
                )}
                />
                }
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
