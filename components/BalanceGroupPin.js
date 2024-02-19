import React from 'react';
import { Text, Pressable,View, StyleSheet } from 'react-native';

import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import BalanceArrow from './BalanceArrow';
const BalanceGroupPin = ({totalBalance}) => {
    return (
        <View style={{
            flex:1,
            flexDirection:"row",
            alignItems:"stretch",
            backgroundColor: COLOR.BALANCE_PIN,
        }}>
            <View style={{
                justifyContent:"center",
            }}>
               <View style={{
               paddingLeft:calcWidth(2),
                flex:0,
                backgroundColor:totalBalance > 0 ? COLOR.BALANCE_ARROW_PADDING_POSITIVE_COLOR: COLOR.BALANCE_ARROW_PADDING_NEGATIVE_COLOR,
                borderBottomRightRadius:10,
                borderTopEndRadius:10
               }}>
                <BalanceArrow totalBalance={totalBalance}/>
                </View>
            </View>
        <Pressable
        style={styles.balanceInfo}
        onPress={() => {
            navigation.navigate(PAGES.GROUP_BALANCE, {
                group: balances,
            });
        }}
    >
        <View style={styles.balanceInfoLeft}>
            <View
                style={[
                    styles.indicator,
                    {
                        backgroundColor:
                            totalBalance > 0 ? COLOR.BALANCE_PIN : 'red',
                    },
                ]}
            />
            <View style={styles.balanceTextContainer}>
                <Text style={styles.balanceText}>
                    Total Split Balance
                </Text>
                <Text style={styles.subBalanceText}>
                    {totalBalance < 0 ? 'you owe' : 'you get back'}
                </Text>
            </View>
        </View>
        <View style={styles.balanceAmountContainer}>
            <Text style={styles.balanceAmount}>
                ₹{Math.abs(totalBalance)}
            </Text>
        </View>
    </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
    balanceInfo: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: calcHeight(1),
        backgroundColor:COLOR.BALANCE_PIN
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
    }
});

export default BalanceGroupPin;
