import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';

const SharedItem = ({ user, amount, generateColor }) => {
    return (
        <View style={styles.sharedDetail}>
            <View
                style={[
                    styles.circle,
                    {
                        backgroundColor: generateColor(user._id),
                    },
                ]}
            />
            <Text style={styles.sharedUser}>{user.name}</Text>
            <Text style={styles.sharedAmount}>₹ {parseInt(amount)}</Text>
        </View>
    );
};

export default SharedItem;

const styles = StyleSheet.create({
    circle: {
        width: calcWidth(5),
        height: calcWidth(5),
        borderRadius: calcWidth(5) / 2,
        marginRight: calcWidth(2),
    },
    sharedDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: calcHeight(1),
        marginHorizontal: calcWidth(5),
    },
    sharedUser: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
    },
    sharedAmount: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(14),
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
});
