import React, { useContext } from 'react';
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import { AuthContext } from '../AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const SingleUser = ({ user, handleViewDetails, reload, setReload }) => {
    const { userId } = useContext(AuthContext)

    const handleDelete = async (id, userId) => {
        console.log(id, userId)
        if (!userId) {
            toast.error("Please login first");
        }
        if (window.confirm('Do you want to delete this')) {
            const result = await axios.delete('http://localhost:5000/delete-user', {
                data: {
                    id
                }
            })
            console.log(result)
            if (result.status === 200) {
                toast.success("Deleted Successfull");
                setReload(!reload)
            }
        }

    }

    return (
        <div

            className="p-4 border rounded-md hover:shadow-md cursor-pointer position-relative "
        // onClick={() => handleViewDetails(user.id)}
        >

            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            {user?.author === userId && <div className="flex justify-end mt-3  gap-2">
                <FaRegEdit size={30} />
                <MdOutlineDelete onClick={() => handleDelete(user?._id, userId)} color='red' size={30} />
            </div>}
        </div>
    );
};

export default SingleUser;