import * as React from 'react';

const AuthContext = React.createContext({
    authState: null,
    operation: null,
    isLoading: false,
    setOperation: null,
    setIsLoading: null,
});

AuthContext.displayName = 'AuthContext';
export default AuthContext;
