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
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import TransactionCard from '../components/TransactionCard';
import LoginIcon from '../assets/Login.png';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth } from '../helper/res';
import { getFontSizeByWindowWidth } from '../helper/res';
import { useTransaction } from '../context/TransactionContext';
import sliceText from '../helper/sliceText';
import { useAuth } from '../context/AuthContext';
function GroupScreen({
    navigation,
    route: {
        params: { group },
    },
}) {
    const { user } = useAuth();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View
                    style={{
                        width: '40%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="chevron-back"
                            size={calcHeight(3)}
                            color="#87CEEB"
                        />
                    </Pressable>
                    <GroupIcon image={LoginIcon} />
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: calcHeight(2),
                }}
            >
                <View
                    style={{
                        borderRightColor:
                            group.totalBalance < 0 ? 'red' : 'green',
                        borderRightWidth: calcWidth(2),
                        borderRadius: 10,
                    }}
                ></View>
                <View>
                    <View></View>
                    <Text
                        style={{
                            color: COLOR.TEXT,
                            fontSize: getFontSizeByWindowWidth(15),
                            fontWeight: 'bold',
                        }}
                    >
                        Total Split Balance
                    </Text>
                    <Text
                        style={{
                            color: '#7F7F7F',
                            fontSize: getFontSizeByWindowWidth(10),
                        }}
                    >
                        {group.totalBalance < 0
                            ? 'you have to give'
                            : 'you get back'}
                    </Text>
                </View>
                <Text
                    style={{
                        color: COLOR.TEXT,
                        fontSize: getFontSizeByWindowWidth(15),
                        fontWeight: 'bold',
                    }}
                >
                    ${group.totalBalance}
                </Text>
            </View>
            <FlatList
                data={group.totalBalance > 0 ? group.borrowers : group.lenders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: calcHeight(2),
                            padding: calcHeight(2),
                            alignItems: 'center',
                            backgroundColor: 'rgba(52, 47, 79, 0.53)',
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            const payment = {
                                group: group.id,
                                amount: item.amount,
                            };
                            if (group.totalBalance > 0) {
                                payment['from'] = item;
                                payment['to'] = user;
                            } else {
                                payment['from'] = user;
                                payment['to'] = item;
                            }
                            navigation.navigate(PAGES.PAYMENT, { payment });
                        }}
                    >
                        <View>
                            <GroupIcon image={LoginIcon} />
                        </View>
                        <View>
                            <View></View>
                            <Text
                                style={{
                                    color: COLOR.TEXT,
                                    fontSize: getFontSizeByWindowWidth(15),
                                    fontWeight: 'bold',
                                }}
                            >
                                {sliceText(item.name, 10)}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color:
                                        group.totalBalance < 0
                                            ? 'red'
                                            : 'green',
                                    fontSize: getFontSizeByWindowWidth(12),
                                    fontWeight: 'bold',
                                }}
                            >
                                ${item.amount}
                            </Text>
                            <Text
                                style={{
                                    color:
                                        group.totalBalance < 0
                                            ? 'red'
                                            : 'green',
                                    fontSize: getFontSizeByWindowWidth(8),
                                }}
                            >
                                {' '}
                                {group.totalBalance < 0
                                    ? 'you have to give'
                                    : 'you get back'}
                            </Text>
                        </View>
                        <AntDesign
                            name="right"
                            size={calcHeight(1.5)}
                            color="white"
                        />
                    </Pressable>
                )}
                style={{
                    marginTop: calcHeight(5),
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
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    groupNameContainer: {
        // marginLeft: calcWidth(5),
    },
    groupName: {
        color: 'white',
        fontWeight: 'bold',
    },
});

// 9. Export Statement
export default GroupScreen;
