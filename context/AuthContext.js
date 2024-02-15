import React, { createContext, useContext, useState, useEffect } from 'react';

import {
    setLocalStoreData,
    removeLocalStoreData,
    clearAllLocalStoreData,
} from '../helper/localStorage';
import apiHelper from '../helper/apiHelper';
import { TOKEN } from '../constants/string';
import * as SplashScreen from 'expo-splash-screen';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await apiHelper.get('/user');
                setUser(data);
            } catch (e) {
                logout();
            }
            await SplashScreen.hideAsync();
        })();
    }, []);

    const addName = (name) => {
        apiHelper.put('/user', { name });
        setUser((prev) => ({ ...prev, name }));
    };

    const logout = () => {
        setUser('');
        clearAllLocalStoreData();
    };

    async function verifyOTP(phoneNumber, countryCode, otp) {
        const endpoint = user ? 'editPhoneNumber' : 'verifyOTP';
        const { data } = await apiHelper.post(`/auth/${endpoint}`, {
            phoneNumber,
            countryCode,
            otp,
        });
        if (user) {
            setUser((prev) => ({
                ...prev,
                phoneNumber,
                countryCode,
            }));
            return;
        }
        if (data.status) return;
        const { userData, token } = data;
        setUser(userData);
        setLocalStoreData(TOKEN, token);
    }

    async function editUser(editedUser) {
        setUser((prev) => {
            apiHelper.put('/user', editedUser);
            return {
                ...prev,
                ...editedUser,
            };
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                verifyOTP,
                addName,
                logout,
                editUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
