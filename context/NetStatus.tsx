import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';

interface NetStatusContextType {
    isOnline: boolean;
}

const NetStatusContext = createContext<NetStatusContextType | undefined>(undefined);

export const NetStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        const handleNetworkChange = (state: NetInfoState) => {
            setIsOnline(state.isConnected);
        };

        let unsubscribe: NetInfoSubscription;
        NetInfo.fetch().then((state) => {
            handleNetworkChange(state);
            unsubscribe = NetInfo.addEventListener(handleNetworkChange);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <NetStatusContext.Provider
            value={{
                isOnline,
            }}
        >
            {children}
        </NetStatusContext.Provider>
    );
};

export const useNetStatus = (): NetStatusContextType => {
    const context = useContext(NetStatusContext);
    if (context === undefined) {
        throw new Error('useNetStatus must be used within a NetStatusProvider');
    }
    return context;
};
