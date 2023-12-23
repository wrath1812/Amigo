import React, { createContext, useContext, useState, useEffect } from 'react';

import { setLocalStoreData } from '../helper/localStorage';
import apiHelper from "../helper/apiHelper";
import { TOKEN} from '../constants/string';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user,setUser]=useState();

    useEffect(()=>{
        (async()=>{
            setLoading(true);
        const {data}=await apiHelper.get("/user");
        setLoading(false);
        setUser(data);
    })()
    },[])

    const login = async (email,password) => {
        setLoading(true);
        try{
        const {data}=await apiHelper.post("/auth/login",{email,password});
        setLoading(false);
        const {token,userData}=data;
        setUser(userData);
        setLocalStoreData(TOKEN,token);
        }
        catch(e)
        {
            console.log(e);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
