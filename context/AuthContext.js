import React, { createContext, useContext, useState, useEffect } from 'react';
import authenticateUser from '../helper/authenticate';
import { getLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { decryptData } from '../helper/encryption';
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
            setTimeout(() => {
                setLoading(false);
                },500);
            return;}
        const decryptedCards = encryptedCards.map((card, index) => {
            const decryptedCard = decryptData(card, encryptionKey);
            return { ...decryptedCard, index };
        });
        setCards(decryptedCards);
        setTimeout(() => {
        setLoading(false);
        },500);
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
                cards,
                setCards,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
