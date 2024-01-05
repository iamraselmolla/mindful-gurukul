import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { findUserId } from '../utlis/checkUserInfo';

const Dashboard = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', author: '' });
    const [reload, setReload] = useState(false)
    const [filterType, setFilterType] = useState(''); // 'asc', 'desc', 'lastModified', 'lastInserted'
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const userId = findUserId()

    const saveToLocalStorage = () => {
        try {
            const stateToSave = {
                filterType,
                searchQuery,
            };
            localStorage.setItem('dashboardState', JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };
    useEffect(() => {
        const savedState = localStorage.getItem('dashboardState');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                setFilterType(parsedState.filterType);
                setSearchQuery(parsedState.searchQuery);
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
    }, []);
    const handleAddUser = async () => {
        if (isOnline) {
            if (!userId) {
                return toast.error("Please login first")
            }
            try {
                const response = await axios.post('http://localhost:5000/add-user', {
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    author: userId,
                })
                if (response.status === 201) {

                    toast.success('User added successfully');
                    setIsModalOpen(false);
                    setNewUser({ name: '', email: '', phone: '', author: '' })
                    setReload(!reload)

                }
            } catch (err) {
                toast.error("Please give unique email, phone number")
            }
        } else {
            toast.error('Please connect WI-FI or Mobile Data');
        }


    };

    const handleViewDetails = (userId) => {
        // Add your logic to navigate to the details screen
        // For now, let's just show a toast message
        toast.success(`View details for user with ID ${userId}`);
    };




    useEffect(() => {

        const fetchUser = async () => {

            const getAllUser = await axios.get(`http://localhost:5000/users?id=${userId}`);

            if (getAllUser.status === 200) {
                const usersData = getAllUser.data.data;

                // Apply Filter
                let filteredList = [...usersData];
                if (filterType === 'asc') {
                    filteredList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
                } else if (filterType === 'desc') {
                    filteredList = filteredList.sort((a, b) => b.name.localeCompare(a.name));
                } else if (filterType === 'lastModified') {
                    // Implement your lastModified logic
                } else if (filterType === 'lastInserted') {
                    // Implement your lastInserted logic
                }

                // Apply Search
                if (searchQuery) {
                    filteredList = filteredList.filter(
                        (user) =>
                            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.phone.includes(searchQuery)
                    );
                }

                setFilteredUsers(filteredList);
                saveToLocalStorage();
            }
        };
        fetchUser();
    }, [userId, reload, filterType, searchQuery]);
    return (
        <section className="container mx-auto py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">User Dashboard</h1>
                <select
                    className="p-2 border rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">Select Filter</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="lastModified">Last Modified</option>
                    <option value="lastInserted">Last Inserted</option>
                </select>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md ml-4"
                    placeholder="Search by Name, Mobile, or Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="btn btn-primary text-white fw-bolder "
                    onClick={() => setIsModalOpen(true)}
                >
                    Add User
                </button>
            </div>
            {filteredUsers.length === 0 ? (
                <div className="mt-8 flex items-center justify-center">
                    <img
                        src="images/no-data-found.png"  // Replace with your placeholder image path
                        alt="No Data Found"
                        className="max-w-full h-auto"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 border rounded-md hover:shadow-md cursor-pointer"
                            onClick={() => handleViewDetails(user.id)}
                        >
                            <h2 className="text-lg font-semibold">{user.name}</h2>
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
                                            <label htmlFor="name" className="block text-gray-600">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full border p-2 rounded-md"
                                                placeholder="Enter Name"
                                                value={newUser.name}
                                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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