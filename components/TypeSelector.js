import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import typeIcon from '../assets/icons/type.png'; // Make sure this path is correct

const TypeSelector = ({ setType }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#342F4F',
                padding: 10,
                flexDirection: 'row',
            }}
            onPress={() => {/* Implement type selection logic here */}}
        >
            <Text
                style={{
                    fontSize: getFontSizeByWindowWidth(15),
                    color: COLOR.TEXT,
                }}
            >
                Type
            </Text>
            <Image
                style={{
                    height: 20,
                    width: 20,
                }}
                source={typeIcon}
            />
        </TouchableOpacity>
    );
};

export default TypeSelector;
