import React from 'react';
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'

const SingleUser = ({ user, handleViewDetails }) => {
    return (
        <div
            key={user.id}
            className="p-4 border rounded-md hover:shadow-md cursor-pointer position-relative "
            onClick={() => handleViewDetails(user.id)}
        >

            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <div className="flex justify-end mt-3  gap-2">
                <FaRegEdit size={30} />
                <MdOutlineDelete color='red' size={30} />
            </div>
        </div>
    );
};

export default SingleUser;