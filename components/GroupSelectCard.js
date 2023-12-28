import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import LoginImage from '../assets/Login.png';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import GroupIcon from './GroupIcon';
import { AntDesign } from '@expo/vector-icons'; 

function GroupSelectCard({ name,onPress }) {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.container}
        >
            <GroupIcon image={LoginImage} />
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <AntDesign name="right" size={calcWidth(5)}color="white" />
        </Pressable>
    );
}

export default GroupSelectCard;

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
        color: COLOR.TEXT,
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
