import React, { useState } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                authState
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
