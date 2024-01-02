import React, { useState } from "react";
import { classForInput, classForLabel } from "./css_classes";
import Input from "../shared/Input";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    linkedin: false,
    friends: false,
    jobportal: false,
    others: false,
    city: "Mumbai",
    state: "Gujarat",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can fetch the data or perform any other action with the form data
    console.log("Form data:", formData);
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
            Register Yourself!
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className={classForLabel}>
                    Name
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className={classForLabel}>
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className={classForLabel}>
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="gender" className={classForLabel}>
                    Gender
                  </label>
                  <div className="mt-2 flex gap-6">
                    <div className="flex gap-2">
                      <label>Male</label>{" "}
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="radio"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <label>Female</label>{" "}
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="radio"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <label>Others</label>{" "}
                      <input
                        type="radio"
                        name="gender"
                        value="others"
                        className="radio"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      How did you hear about this
                    </legend>
                    <div className="mt-2 gap-4 flex">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="linkedin"
                            name="linkedin"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleChange}
                            checked={formData.linkedin}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="linkedin"
                            className="font-medium text-gray-900"
                          >
                            LinkedIn
                          </label>
                        </div>
                      </div>

                      {/* Repeat similar structure for other checkboxes */}
                    </div>
                  </fieldset>
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className={classForLabel}>
                    City
                  </label>
                  <div className="mt-2">
                    <select
                      id="city"
                      name="city"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Ahmedabad</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="state" className={classForLabel}>
                    State
                  </label>
                  <div className="mt-2">
                    <select
                      id="state"
                      name="state"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register Now!
                </button>
              </div>
            </form>
            <div className="flex justify-center items-center">
              <img src="images/register.png" className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
