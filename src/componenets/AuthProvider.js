import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { checkLogin, findUserId } from './utlis/checkUserInfo';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(checkLogin());
    const [userId, setUserId] = useState(findUserId())
    const [reload, setReload] = useState(false)



    const authInfo = { login, setUserId, userId, setLogin, reload, setReload }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;