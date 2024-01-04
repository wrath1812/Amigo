import React, { useState, useEffect } from "react";
import { View, StyleSheet, Linking, Button, Image } from "react-native";
import * as BarCodeScanner from "expo-barcode-scanner";
import CameraScanner from "../components/CameraScanner";
import { useTransaction } from "../context/TransactionContext";
import URL from 'url-parse';
import PAGES from "../constants/pages";
const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLit, setIsLit] = useState(false);
  const {setUpiParams}=useTransaction();
  useEffect(() => {
    const checkCameraPermission = async () => {
      const { status } = await BarCodeScanner.getPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        requestCameraPermission();
      }
    };
    checkCameraPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ data }) => {
    try {
      const url = new URL(data, true); // 'true' for parsing query string
      const params = url.query; // Query parameters are parsed into an object
  
      // Initialize an object to store the extracted parameters
      const extractedParams = {};
  
      // Check the URL host to identify the UPI app
      const host = url.host.toLowerCase();
      if (host.includes('gpay')) {
        // Parse parameters specific to Google Pay URLs
        extractedParams.transactionId = params.transactionId; // Transaction ID
        extractedParams.receiverId = params.receiverId; // Receiver ID
        extractedParams.amount = params.amount; // Amount
        // Add more parameters as per Google Pay's URL structure
      } else if (host.includes('phonepe')) {
        // Parse parameters specific to PhonePe URLs
        extractedParams.merchantCode = params.merchantCode; // Merchant code
        extractedParams.transactionId = params.transactionId; // Transaction ID
        extractedParams.amount = params.amount; // Amount
        // Add more parameters as per PhonePe's URL structure
      } else if (host.includes('paytm')) {
        // Parse parameters specific to Paytm URLs
        extractedParams.paytmUser = params.user; // Paytm User
        extractedParams.orderId = params.orderId; // Order ID
        extractedParams.amount = params.amount; // Amount
        // Add more parameters as per Paytm's URL structure
      } else if (url.protocol === 'upi:') {
        // Handle generic UPI URLs
        extractedParams.upiId = url.pathname;
        Object.assign(extractedParams, params); // Copy all parsed parameters
      } else {
        // Fallback for other types or unrecognized formats
        Object.assign(extractedParams, params); // Copy all parsed parameters
      }
  
      setUpiParams(extractedParams);
      navigation.navigate(PAGES.ADD_TRANSACTION);
  
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
      ) :
        <CameraScanner
          handleBarCodeScanned={handleBarCodeScanned}
          isLit={isLit}
          setIsLit={setIsLit}
        />
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRCodeScanner;
