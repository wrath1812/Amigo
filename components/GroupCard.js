import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import LoginImage from '../assets/Login.png';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import GroupIcon from './GroupIcon';
import { useGroup } from '../context/GroupContext';
import getMembersString from '../utility/getMembersString';
function GroupCard({ group }) {
    const navigation = useNavigation();
    const { setGroup } = useGroup();
    return (
        <Pressable
            onPress={() => {
                setGroup(group);
                navigation.navigate(PAGES.GROUP);
            }}
            style={styles.container}
        >
            <GroupIcon groupId={group._id} />
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{group.name}</Text>
                <Text style={styles.memberText}>
                    {getMembersString(group.members, 30)}
                </Text>
            </View>
        </Pressable>
    );
}

export default GroupCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(6),
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
