import React, { useEffect } from 'react';
import { checkLogin } from '../utlis/checkUserInfo';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Protected = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!checkLogin()) {
            toast.error("Please login first")
            navigate('/login')
            return
        }
    }, [])
    return children;
};

export default Protected;