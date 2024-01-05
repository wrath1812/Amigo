import React, { createContext, useContext, useState, useEffect } from 'react';
import apiHelper from '../helper/apiHelper';
const TransactionContext = createContext();
import { useAuth } from './AuthContext';

export const TransactionProvider = ({ children }) => {
    const { user } = useAuth();
    const [transactionData, setTransactionData] = useState({});
    const [upiParams, setUpiParams] = useState({});

    const resetTransaction = () => {
        setTransactionData((prev) => ({
            ...prev,
            amount: '',
            description: '',
            date: new Date(),
            type: 'General',
            splitAmong: [],
            group: {},
            paidBy: { _id: user?._id, name: user?.name },
        }));
    };

    return (
        <TransactionContext.Provider
            value={{
                transactionData,
                setTransactionData,
                resetTransaction,
                upiParams,
                setUpiParams,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => {
    return useContext(TransactionContext);
};
