import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { findUserId } from '../utlis/checkUserInfo';
import SingleUser from '../shared/SingleUser';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (isOnline) {
                    setLoading(true)
                    const getAllUser = await axios.get(`https://mindful-gurukul-server-sandy.vercel.app/users`);

                    if (getAllUser.status === 200) {
                        setUsers(getAllUser.data.data)
                        setLoading(false)
                    }
                }
                else {
                    toast.error("Please connect your Wi-Fi or Mobile Data")
                    setLoading(false)
                }
            }
            catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])
    const handleViewDetails = (userId) => {
        // Add your logic to navigate to the details screen
        // For now, let's just show a toast message
        toast.success(`View details for user with ID ${userId}`);
    };
    if (loading) {
        return <div className='flex justify-center items-start'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <section className="container mx-auto py-10">
            <h1 className="text-4xl mb-5">All Added User</h1>
            {!loading && users?.length === 0 ? (
                <div className="mt-8 flex items-center justify-center">
                    <img
                        src="images/no-data-found.png"
                        alt="No Data Found"
                        className="w-1/3 h-auto"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {users.map((user) => (
                        <SingleUser key={user?._id} user={user} handleViewDetails={handleViewDetails} />
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
                                            <label htmlFor="name" className="block text-gray-600">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full border p-2 rounded-md"
                                                placeholder="Enter Name"
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
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="btn btn-primary mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline"
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

export default Home;