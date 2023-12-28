import React, { createContext, useContext, useState, useEffect } from 'react';
import apiHelper from '../helper/apiHelper';
const TransactionContext = createContext();
import { useAuth } from './AuthContext';

export const TransactionProvider = ({ children }) => {
    const { user } = useAuth();
    const [transactionData,setTransactionData]=useState({
        amount: '',
        description: '',
        category: '',
        date: new Date(),
        type: 'Other',
        splitAmong: [],
        group:{}
    });

    useEffect(()=>{
        setTransactionData((prev)=>({
            ...prev,paidBy:{_id:user?._id,name:user?.name}
        }))
    },[user])

    return (
        <TransactionContext.Provider
            value={{
                transactionData,
                setTransactionData
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => {
    return useContext(TransactionContext);
};
