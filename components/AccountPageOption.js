import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

function AccountPageOption({ iconName, label, IconComponent, additionalStyle, onPress }) {
    return (
        <Pressable style={[styles.menuOption, additionalStyle]} onPress={onPress}>
            <IconComponent name={iconName} size={calcHeight(3)} color="white" />
            <Text style={styles.menuText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    menuOption: {
        flexDirection: 'row',
        margin: calcWidth(5),
        alignItems: 'center',
        gap: calcWidth(10),
    },
    menuText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AccountPageOption;
