import * as React from 'react';

const AuthContext = React.createContext({
    authState: null,
});

AuthContext.displayName = 'AuthContext';
export default AuthContext;
