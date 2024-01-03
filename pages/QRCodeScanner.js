import React, { useState, useEffect } from "react";
import { View, StyleSheet, Linking, Button, Image } from "react-native";
import * as BarCodeScanner from "expo-barcode-scanner";
import CameraScanner from "../components/CameraScanner";

const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [isLit, setIsLit] = useState(false);

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
      // do something - for example: reset states, ask for camera permission
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    Linking.openURL(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData("");
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
