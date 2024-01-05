import React, { useContext, useEffect } from 'react';
import { checkLogin } from '../utlis/checkUserInfo';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider';

const Protected = ({ children }) => {
    const { userId } = useContext(AuthContext)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!checkLogin()) {
    //         toast.error("Please login first")
    //         return
    //     }
    // }, [userId])
    return children;
};

export default Protected;