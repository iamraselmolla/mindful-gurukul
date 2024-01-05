import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { findUserId } from './utlis/checkUserInfo';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(findUserId())
    const [reload, setReload] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('user')
        toast.error("Logged Out ❌")
        setLogin(false)
        setUserId(null)

    }

    const authInfo = { login, handleLogout, userId, setLogin, reload, setReload }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;