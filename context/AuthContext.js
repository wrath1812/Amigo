import React, { createContext, useContext, useState, useEffect } from 'react';

import { generateEncryptionKey } from '../helper/encryption';
import { storeSecret, retrieveSecret } from '../helper/secureStorage';
import { ENCRYPTION_KEY } from '../constants/string';
import authenticateUser from '../helper/authenticate';
import { getLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { decryptData } from '../helper/encryption';

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
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const getCards = async () => {
        const encryptionKey = await getEncryptionKey();
        const encryptedCards = await getLocalStoreData(CARDS);
        if (!encryptedCards) return;
        const decryptedCards = encryptedCards.map((card, index) => {
            const decryptedCard = decryptData(card, encryptionKey);
            return { ...decryptedCard, index };
        });
        setCards(decryptedCards);
    };

    useEffect(() => {
        if (isAuthenticated) getCards();
    }, [isAuthenticated]);

    const logout = () => {
        setIsAuthenticated(false);
        setCards([]);
    };
    const login = async () => {
        if (!isAuthenticated) {
            const result = await authenticateUser();
            if (result.success || result.error == 'not_enrolled') {
                setIsAuthenticated(true);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                logout,
                login,
                loading,
                setLoading,
                cards,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
