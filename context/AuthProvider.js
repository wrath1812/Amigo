import React, { useEffect, useState } from 'react';
import AuthOperation from 'app/constants/authOperation';
import AuthContext from './AuthContext';
import { apiHelper } from 'app/utils';
import { LocalStorage } from 'app/utils';

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(null);
    const [operation, setOperation] = useState(AuthOperation.LOGIN);
    const [isLoading, setIsLoading] = useState(true);

    const performOperation = async () => {
        if (operation === AuthOperation.LOGIN) {
            await apiHelper
                .get('/user')
                .then(({ data }) => {
                    setAuthState(data);
                })
                .catch((err) => console.log('Error:', err));
            await apiHelper
                .get('/questions')
                .then(({ data }) => {
                    setGenericQuestions(data.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            setIsLoading(false);
            setOperation(null);
        } else if (operation === AuthOperation.LOGOUT) {
            setIsLoading(true);
            setAuthState(null);
            await LocalStorage.removeLocalStoreData('token');
            setIsLoading(false);
            setOperation(null);
            setGenericQuestions([{}]);
        }
    };

    useEffect(() => {
        performOperation();
    }, [operation]);

    return (
        <AuthContext.Provider
            value={{
                authState,
                setAuthState,
                isLoading,
                setOperation,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
