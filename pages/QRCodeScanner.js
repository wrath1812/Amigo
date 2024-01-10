import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking, Button, Image } from 'react-native';
import * as BarCodeScanner from 'expo-barcode-scanner';
import CameraScanner from '../components/CameraScanner';
import { useTransaction } from '../context/TransactionContext';
import URL from 'url-parse';
import PAGES from '../constants/pages';

const QRCodeScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isLit, setIsLit] = useState(false);
    const { setUpiParams } = useTransaction();
    useEffect(() => {
        const checkCameraPermission = async () => {
            const { status } = await BarCodeScanner.getPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                requestCameraPermission();
            }
        };
        checkCameraPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setHasPermission(false);
            (async () => {
                const { status } =
                    await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        });

        return unsubscribe;
    }, [navigation]);

    const requestCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const parseQueryString = (queryString) => {
        const pairs = queryString.substring(1).split('&');
        const params = {};
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(
                pair[1] || '',
            );
        }
        return params;
    };

    const handleBarCodeScanned = ({ data }) => {
        try {
            const url = new URL(data);

            const params = parseQueryString(url.query);

            // Initialize an object to store extracted parameters
            const extractedParams = {
                receiverId: '',
                // Add other common parameters here
            };

            // Check the URL scheme to identify UPI and extract relevant data
            if (url.protocol === 'upi:') {
                extractedParams.receiverId = params['pa'] || ''; // Use 'pa' parameter as receiverId
                Object.assign(extractedParams, params);
                setUpiParams(extractedParams); // Ensure setUpiParams is defined and available
                navigation.navigate(PAGES.ADD_TRANSACTION); // Ensure navigation and PAGES are defined and available
            } else {
                alert('Not a valid UPI URL');
                return;
            }
        } catch (error) {
            console.error('Error processing scanned data:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <View style={styles.container}>
            {!hasPermission ? (
                <Button
                    title="Allow Camera Permission"
                    onPress={requestCameraPermission}
                />
            ) : (
                <CameraScanner
                    handleBarCodeScanned={handleBarCodeScanned}
                    isLit={isLit}
                    setIsLit={setIsLit}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QRCodeScanner;
