import React, { createContext, useContext, useState } from 'react';

import { generateEncryptionKey } from '../helper/encryption';
import { storeSecret, retrieveSecret } from '../helper/secureStorage';
import { ENCRYPTION_KEY } from '../constants/string';
import authenticateUser from '../helper/authenticate';
const AuthContext = createContext();

async function getEncryptionKey() {
    let key = await retrieveSecret(ENCRYPTION_KEY);
    if (!key) {
        const key = generateEncryptionKey();
        await storeSecret(ENCRYPTION_KEY, key);
    }
    return key;
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [encryptionKey, setEncryptionKey] = useState(null);
    const [loading,setLoading] = useState(false);
    
    const logout = () => {
        setIsAuthenticated(false);
        setEncryptionKey(null);
    };
    const login = async () => {
        if (!isAuthenticated) {
            const result = await authenticateUser();
            if (result.success || result.error == 'not_enrolled') {
                setIsAuthenticated(true);
            }
        }
        const key = await getEncryptionKey();
        setEncryptionKey(key);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, logout, encryptionKey,login }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
