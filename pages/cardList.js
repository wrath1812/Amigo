import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import cardData from '../data';
import Card from '../components/card';
import * as LocalAuthentication from 'expo-local-authentication';

function CardList() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function authenticateUser() {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate using biometrics',
          fallbackLabel: 'Enter PIN',
        });

        if (result.success) {
          // Authentication successful
          console.log('Authentication successful');
          setIsAuthenticated(true);
        } else {
          // Authentication failed or was canceled
          console.log('Authentication failed or canceled');
        }
      } catch (error) {
        // Handle any errors that occur during authentication
        console.error('Authentication error:', error);
      }
    }

    if (!isAuthenticated) {
      authenticateUser();
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cardData}
        renderItem={Card}
        keyExtractor={(item) => item.card_number}
      />
    </View>
  );
}

export default CardList;
