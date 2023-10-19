import React from 'react';
import { View, StyleSheet,Platform } from 'react-native';
import { calcHeight } from '../../helper/res';

function BannerAdComponent() {
    const adUnitId = Platform.OS==="android"?'ca-app-pub-5499479031752321/9692031539':'ca-app-pub-5499479031752321/6052991239';
    const {
        BannerAd,
        BannerAdSize,
        TestIds,
    } = require('react-native-google-mobile-ads');

    return (
        <View style={styles.adBannerContainer}>
            <BannerAd
                size={BannerAdSize.BANNER}
                unitId={adUnitId}
                testDevices={[TestIds.SIMULATOR]}
                onAdLoaded={() => {
                    // Ad has loaded successfully
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Ad failed to load: ', error);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    adBannerContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Adjust the width as needed
        height: calcHeight(8), // Adjust the height as needed
    },
});

export default BannerAdComponent;
