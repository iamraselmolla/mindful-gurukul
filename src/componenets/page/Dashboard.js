import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';

const Dashboard = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', phone: '' });

    const handleAddUser = () => {
        // Add your logic to save the new user data
        // For now, let's just show a toast message
        toast.success('User added successfully');
        setIsModalOpen(false);
    };

    const handleViewDetails = (userId) => {
        // Add your logic to navigate to the details screen
        // For now, let's just show a toast message
        toast.info(`View details for user with ID ${userId}`);
    };




    useEffect(() => {
        if (isOnline) {

        } else {
            toast.error("Please enable your WI-FI or Mobile Data")
        }
    }, [])
    return (
        <section className="container mx-auto py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">User Dashboard</h1>
                <button
                    className="btn btn-primary text-white fw-bolder "
                    onClick={() => setIsModalOpen(true)}
                >
                    Add User
                </button>
            </div>
            {users.length === 0 ? (
                <div className="mt-8 flex items-center justify-center">
                    <img
                        src="images/no-data-found.png"  // Replace with your placeholder image path
                        alt="No Data Found"
                        className="max-w-full h-auto"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 border rounded-md hover:shadow-md cursor-pointer"
                            onClick={() => handleViewDetails(user.id)}
                        >
                            <h2 className="text-lg font-semibold">{user.username}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">{user.phone}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add User Modal */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-4">Add User</h3>
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="username" className="block text-gray-600">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="w-full border p-2 rounded-md"
                                                placeholder="Enter username"
                                                value={newUser.username}
                                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-600">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full border p-2 rounded-md"
                                                placeholder="Enter email"
                                                value={newUser.email}
                                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-gray-600">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className="w-full border p-2 rounded-md"
                                                placeholder="Enter phone number"
                                                value={newUser.phone}
                                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="btn btn-primary mr-2"
                                                onClick={handleAddUser}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
};

export default Dashboard;