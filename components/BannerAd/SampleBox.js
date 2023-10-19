import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calcHeight, getFontSizeByWindowWidth } from '../../helper/res';

function SampleBox() {
    return (
        <View style={styles.adBannerPlaceholder}>
            <Text style={styles.sampleText}>Sample Box</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    adBannerPlaceholder: {
        width: '100%', // Adjust the width as needed
        height: calcHeight(8), // Adjust the height as needed
        backgroundColor: 'lightgray', // Placeholder background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    sampleText: {
        fontSize: getFontSizeByWindowWidth(16), // Font size based on device width
        color: 'black',
    },
});

export default SampleBox;
