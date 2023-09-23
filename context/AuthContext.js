// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

import * as LocalAuthentication from 'expo-local-authentication';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    async function authenticateUser() {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate using biometrics',
          fallbackLabel: 'Enter PIN',
        });

        if (result.success) {
          setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
