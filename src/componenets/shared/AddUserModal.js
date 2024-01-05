import { Transition } from '@headlessui/react';
import React from 'react';

const AddUserModal = ({ setNewUser, newUser, handleAddUser, setIsModalOpen }) => {
    return (
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
    );
};

export default AddUserModal;