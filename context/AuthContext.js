// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

import * as LocalAuthentication from 'expo-local-authentication';

import { generateEncryptionKey } from '../helper/encryption';
import { storeSecret, retrieveSecret } from '../helper/secureStorage';
import { ENCRYPTION_KEY } from '../constants/string';
const AuthContext = createContext();

async function getEncryptionKey()
{
    let key= await retrieveSecret(ENCRYPTION_KEY);
    if(!key)
    {
        const key= generateEncryptionKey();
        await storeSecret(ENCRYPTION_KEY, key);
    }
    return key;
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [encryptionKey, setEncryptionKey] = useState(null);

    const logout = () => setIsAuthenticated(false);

    useEffect(() => {
        async function authenticateUser() {
            try {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate using biometrics',
                    fallbackLabel: 'Enter PIN',
                });

                if (result.success || result.error=="not_enrolled") {
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
        (async () => {

        const key=await getEncryptionKey();
        setEncryptionKey(key);
        })();

    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, encryptionKey }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};