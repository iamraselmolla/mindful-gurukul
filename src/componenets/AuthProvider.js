import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { findUserId } from './utlis/checkUserInfo';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null)
    const [reload, setReload] = useState(false)



    const authInfo = { login, setUserId, userId, setLogin, reload, setReload }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;