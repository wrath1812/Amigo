import React, { createContext, useContext, useState, useEffect } from 'react';

import { CARDS } from '../constants/string';
import authenticateUser from '../helper/authenticate';
import { decryptData } from '../helper/encryption';
import { getLocalStoreData } from '../helper/localStorage';
import getEncryptionKey from '../util/getEncryptionKey';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCards = async () => {
        setLoading(true);
        const encryptionKey = await getEncryptionKey();
        const encryptedCards = await getLocalStoreData(CARDS);
        if (!encryptedCards) {
            setLoading(false);
            return;
        }
        const decryptedCards = encryptedCards.map((card, index) => {
            const decryptedCard = decryptData(card, encryptionKey);
            return { ...decryptedCard, index };
        });
        setCards(decryptedCards);
        setLoading(false);
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
            if (result.success || result.error === 'not_enrolled') {
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
                cards,
                setCards,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
