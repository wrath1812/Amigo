// 1. Import Statements
import React from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Pressable,
    FlatList,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { useAuth } from '../context/AuthContext';
import sliceText from '../helper/sliceText';
import LoginImage from '../assets/Login.png';
import Cross from '../assets/icons/cross.png';
import { Feather } from '@expo/vector-icons';
// 2. GroupBalanceScreen Functional Component
function GroupBalanceScreen({ navigation, route }) {
    const { group } = route.params;
    const { user } = useAuth();

    // Helper function to render list item
    const renderListItem = ({ item }) => {
        const isBorrower = group.totalBalance > 0;
        const balanceColor = group.totalBalance < 0 ? 'red' : '#00C83D';

        const handlePress = () => {
            const payment = {
                group: group._id,
                amount: item.amount,
                from: isBorrower ? item : user,
                to: isBorrower ? user : item,
            };
            navigation.navigate('Payment', { payment });
        };

        return (
            <Pressable onPress={handlePress} style={styles.listItem}>
                <GroupIcon image={group.icon || LoginImage} />
                <Text style={styles.itemName}>{sliceText(item.name, 10)}</Text>
                <Text style={[styles.amountText, { color: balanceColor }]}>
                    ₹{item.amount}
                </Text>
                <Ionicons
                    name="chevron-forward"
                    size={calcHeight(1.5)}
                    color="white"
                />
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{
                            height: calcHeight(3),
                            width: calcHeight(3),
                        }}
                        source={Cross}
                    />
                </Pressable>
                <GroupIcon image={group.icon || LoginImage} />
                <Text style={styles.groupName}>{group.name}</Text>
            </View>
            <View style={styles.balanceInfo}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <View>
                        <View
                            style={{
                                backgroundColor:
                                    group.totalBalance > 0
                                        ? group.totalBalance > 0
                                            ? '#00C83D'
                                            : 'red'
                                        : 'red',
                                width: calcWidth(1),
                                borderTopRightRadius: calcWidth(3),
                                borderBottomRightRadius: calcWidth(3),
                                flex: 1,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            gap: calcHeight(1),
                            marginLeft: calcHeight(3),
                        }}
                    >
                        <Text style={styles.balanceText}>
                            Total Split Balance
                        </Text>
                        <Text style={styles.subBalanceText}>
                            {group.totalBalance < 0
                                ? 'you owe'
                                : 'you get back'}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginRight: calcWidth(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.balanceAmount}>
                        ₹{group.totalBalance}
                    </Text>
                    <View
                        style={{
                            marginLeft: calcWidth(2),
                            padding: calcWidth(0.5),
                            backgroundColor: '#00C83D',
                            borderRadius: calcWidth(2),
                        }}
                    >
                        <Feather
                            name={
                                group.totalBalance > 0
                                    ? 'arrow-up-right'
                                    : 'arrow-down-left'
                            }
                            size={calcWidth(2)}
                            color="white"
                        />
                    </View>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={group.totalBalance > 0 ? group.borrowers : group.lenders}
                keyExtractor={(item) => item._id}
                renderItem={renderListItem}
                style={styles.list}
            />
        </SafeAreaView>
    );
}

// 3. StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: calcWidth(4),
        gap: calcWidth(5)
    },
    groupName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: getFontSizeByWindowWidth(13),
    },
    balanceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: calcHeight(2),
        backgroundColor: 'rgb(33, 24, 45)'
    },
    balanceText: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
    },
    subBalanceText: {
        color: '#7F7F7F',
        fontSize: getFontSizeByWindowWidth(10),
    },
    balanceAmount: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
    },
    list: {
        marginTop: calcHeight(5),
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: calcHeight(2),
        padding: calcHeight(2),
        alignItems: 'center',
        backgroundColor: 'rgba(52, 47, 79, 0.53)',
        borderRadius: 10,
    },
    itemName: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: getFontSizeByWindowWidth(12),
        fontWeight: 'bold',
    },
});

// 4. Export Statement
export default GroupBalanceScreen;
