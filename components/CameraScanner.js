import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, FlashMode } from 'expo-camera';
import QRIndicator from './QRIndicator';
import QRFooterButton from './QRFooterButton';
import { calcHeight, calcWidth } from '../helper/res';
import * as BarCodeScanner from 'expo-barcode-scanner';
import getLocalImage from '../helper/getLocalImage';
import getQrDataFromImage from '../helper/getQrDataFromImage';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CameraScanner = ({ handleBarCodeScanned, isLit, setIsLit }) => {
    const { bottom } = useSafeAreaInsets();
    async function getImage() {
        const image = await getLocalImage();
        const scannedResults = await getQrDataFromImage(image);
        if (scannedResults.length > 0) {
            handleBarCodeScanned(scannedResults[0]);
            return;
        }
        alert('No QR code found in image');
    }
    return (
        <View style={styles.scannerContainer}>
            <Camera
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
                flashMode={isLit ? FlashMode.torch : FlashMode.off}
            />
            <QRIndicator />
            <View style={[styles.footer, { bottom: 30 + bottom }]}>
                <QRFooterButton onPress={() => setIsLit((isLit) => !isLit)} isActive={isLit} iconName="flashlight-sharp" />
                <QRFooterButton onPress={getImage} iconName="image" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scannerContainer: {
        width: calcWidth(100),
        height: calcHeight(100),
        overflow: 'hidden',
        zIndex: 1,
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
    },
});

export default CameraScanner;
