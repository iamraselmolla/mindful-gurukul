import React, { useContext } from 'react';
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import { AuthContext } from '../AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const SingleUser = ({ user, reload, handleEdit, setReload }) => {
    const { userId } = useContext(AuthContext)

    const handleDelete = async (id) => {

        if (window.confirm('Do you want to delete this')) {
            const result = await axios.delete('https://mindful-gurukul-server-sandy.vercel.app/delete-user', {
                data: {
                    id
                }
            })
            if (result.status === 200) {
                toast.success("Deleted");
                setReload(!reload)
            }
        }

    }


    return (
        <div

            className="p-4 border rounded-md hover:shadow-md cursor-pointer position-relative "
        // onClick={() => handleViewDetails(user.id)}
        >
            <img src="images/user.png" className='w-20' alt="" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            {user?.author === userId && window.location.pathname === '/dashboard' && <div className="flex justify-end mt-3  gap-2">
                <FaRegEdit onClick={() => handleEdit(user)} size={30} />
                <MdOutlineDelete onClick={() => handleDelete(user?._id)} color='red' size={30} />
            </div>}
        </div>
    );
};

export default SingleUser;