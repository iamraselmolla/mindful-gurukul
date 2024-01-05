import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { findUserId } from '../utlis/checkUserInfo';
import AddUserModal from '../shared/AddUserModal';
import SingleUser from '../shared/SingleUser';
import { AuthContext } from '../AuthProvider';

const Dashboard = () => {
    const { userId } = useContext(AuthContext)
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', author: '' });
    const [reload, setReload] = useState(false)
    const [filterType, setFilterType] = useState(''); // 'asc', 'desc', 'lastModified', 'lastInserted'
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);



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
                    filteredList = filteredList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                } else if (filterType === 'lastInserted') {
                    filteredList = filteredList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            <div className="items-center justify-between">
                <div className="flex mb-5 justify-between">
                    <h1 className="text-4xl">User Dashboard</h1>
                    <button
                        className="btn btn-primary text-white fw-bolder "
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add User
                    </button>
                </div>


                <div className="flex">
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
                </div>
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

                        <AddUserModal setNewUser={setNewUser} newUser={newUser} setIsModalOpen={setIsModalOpen} handleAddUser={handleAddUser} />
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
};

export default Dashboard;