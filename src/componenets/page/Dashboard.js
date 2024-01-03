import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { findName } from '../utlis/checkUserInfo';

const Dashboard = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);



    useEffect(() => {
        if (isOnline) {

        } else {
            toast.error("Please enable your WI-FI or Mobile Data")
        }
    }, [])
    return (
        <section>
            <div className="container px-md-5 mx-auto">
                <div className="flex">
                    <h1 className="text-4xl">
                        Add User
                    </h1>
                    <button className="btn btn-outline">Add User</button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;