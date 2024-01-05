import React, { createContext, useEffect, useState } from 'react';
import { checkLogin, findUserId } from './utlis/checkUserInfo';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(checkLogin());
    const [userId, setUserId] = findUserId()
    const [getAllUser, setALlUserData] = useState([])
    const [reload, setReload] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem('user')
        toast.error("Logged Out ❌")
        setLogin(false)

    }

    const authInfo = { login, handleLogout, userId, reload, setReload }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;