import React, { useEffect } from 'react';
import { View } from 'react-native';
import CardIO from 'react-native-card-io';
import * as Permissions from 'expo-permissions';

const CardScanner = () => {
  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Camera permission is required to use this feature.');
    }
  };

  const onCardScanned = (card) => {
    // Handle the scanned card details (card number, expiration, etc.)
    console.log('Scanned Card:', card);
  };

  return (
    <View style={{ flex: 1 }}>
      <CardIO
        style={{ flex: 1 }}
        onComplete={onCardScanned}
      />
    </View>
  );
};

export default CardScanner;
