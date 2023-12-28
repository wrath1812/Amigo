import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import LoginImage from '../assets/Login.png';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import GroupIcon from './GroupIcon';

function GroupBalanceCard({ group }) {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate(PAGES.GROUP, { group });
            }}
            style={styles.container}
        >
            <GroupIcon image={LoginImage} />
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{group.name}</Text>
                <Text style={styles.memberText}>
                    {group.lenderNumber == 1
                        ? `${group.borrowerNumber} participants owe you money`
                        : `You owe mony to ${group.lenderNumber} participants`}
                </Text>
            </View>
            <Text
                style={{
                    color: group.totalBalance > 0 ? 'green' : 'red',
                    fontWeight: 'bold',
                }}
            >
                $ {parseInt(group.totalBalance)}
            </Text>
        </Pressable>
    );
}

export default GroupBalanceCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderBottomColor: 'rgba(255, 255, 255, 0.13)',
        borderBottomWidth: 1,
    },
    textContainer: {
        width: calcWidth(60),
        marginLeft: calcWidth(5),
    },
    nameText: {
        color: COLOR.BUTTON,
        fontWeight: 'bold',
        fontSize: getFontSizeByWindowWidth(15),
    },
    memberText: {
        fontSize: getFontSizeByWindowWidth(8),
        color: COLOR.PRIMARY,
        marginTop: calcHeight(0.5),
    },
    placeHolderView: {
        height: calcHeight(5),
        width: calcHeight(5),
        borderRadius: calcHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: calcWidth(2),
    },
    selectorContainer: {
        right: calcWidth(5),
    },
});
