import React, { createContext, useState } from 'react';
import { checkLogin, findUserId } from './utlis/checkUserInfo';
import toast from 'react-hot-toast';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(checkLogin());
    const [userId, setUserId] = findUserId()

    const handleLogout = () => {
        localStorage.removeItem('user')
        toast.error("Logged Out ❌")
        setLogin(false)

    }
    const authInfo = { login, handleLogout, userId }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;