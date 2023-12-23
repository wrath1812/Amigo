import React, { createContext, useContext, useState, useEffect } from 'react';

import { setLocalStoreData ,removeLocalStoreData} from '../helper/localStorage';
import apiHelper from '../helper/apiHelper';
import { TOKEN } from '../constants/string';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            try{
            setLoading(true);
            const { data } = await apiHelper.get('/user');
            setLoading(false);
            setUser(data);

            }
            catch(e)
            {
                logout();
                setLoading(false);
            }
        })();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await apiHelper.post('/auth/login', {
                email,
                password,
            });
            setLoading(false);
            const { token, userData } = data;
            setUser(userData);
            setLocalStoreData(TOKEN, token);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const logout=()=>{
        setUser("");
        removeLocalStoreData(TOKEN);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                setLoading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
