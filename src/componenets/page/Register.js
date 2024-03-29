import React, { useState } from "react";
import Input from "../shared/Input";
import { classForLabel, classForSubmitBtn } from "../shared/css_classes";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "Mumbai",
    state: "",
    howDidYouHear: [],
    password: "",
    stateInput: "",
  });

  const [matchingStates, setMatchingStates] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        howDidYouHear: checked
          ? [...prevData.howDidYouHear, name]
          : prevData.howDidYouHear.filter((item) => item !== name),
      }));
    } else {
      if (name === "stateInput") {
        setFormData((prevData) => ({
          ...prevData,
          stateInput: value,
        }));

        // Update the matching states based on the input
        setMatchingStates(
          states.filter((state) =>
            state.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const handleStateSelection = (selectedState) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      stateInput: selectedState,
    }));
    setMatchingStates([]); // Clear matching states after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      return toast.error("please input password");
    }
    try {
      const result = await axios.post(
        "https://mindful-gurukul-server-sandy.vercel.app/register",
        formData
      );

      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response.status === 409) {
        return toast.error(err?.response?.data?.message);
      }
      console.error(err);
    }
  };

  const states = ["Gujarat", "Maharashtra", "Karnataka", /* Add more states */];

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="border-gray-900/10 pb-12">
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
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="radio"
                        onChange={handleChange}
                      />
                      <label>Male</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="radio"
                        onChange={handleChange}
                      />
                      <label>Female</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="others"
                        className="radio"
                        onChange={handleChange}
                      />
                      <label>Others</label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      How did you hear about this
                    </legend>
                    <div className="mt-2 gap-4 flex">
                      <div className="relative flex gap-x-6">
                        <div className="flex h-6 items-center gap-2">
                          <input
                            id="linkedin"
                            name="linkedin"
                            type="checkbox"
                            checked={formData.howDidYouHear.includes("linkedin")}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="linkedin"
                            className="font-medium text-gray-900"
                          >
                            LinkedIn
                          </label>
                        </div>
                        <div className="flex h-6 items-center gap-2">
                          <input
                            id="friends"
                            name="friends"
                            type="checkbox"
                            checked={formData.howDidYouHear.includes("friends")}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="friends"
                            className="font-medium text-gray-900"
                          >
                            Friends
                          </label>
                        </div>
                        <div className="flex h-6 items-center gap-2">
                          <input
                            id="job-portal"
                            name="job-portal"
                            type="checkbox"
                            checked={formData.howDidYouHear.includes("job-portal")}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="job-portal"
                            className="font-medium text-gray-900"
                          >
                            Job Portals
                          </label>
                        </div>
                        <div className="flex h-6 items-center gap-2">
                          <input
                            id="others"
                            name="others"
                            type="checkbox"
                            checked={formData.howDidYouHear.includes("others")}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="linkedin"
                            className="font-medium text-gray-900"
                          >
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="flex justify-between gap-3 items-center">
                  <div className="mb-4 w-full">
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

                  <div className="mb-4 w-full">
                    <label htmlFor="stateInput" className={classForLabel}>
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="stateInput"
                        name="stateInput"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        placeholder="Start typing to filter states"
                        value={formData.stateInput}
                        onChange={handleChange}
                      />
                      {matchingStates.length > 0 && (
                        <div className="mt-1 border border-gray-300 bg-white rounded-md shadow-lg max-h-36 overflow-y-auto">
                          {matchingStates.map((state) => (
                            <div
                              key={state}
                              className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleStateSelection(state)}
                            >
                              {state}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className={classForLabel}>
                    Password
                  </label>
                  <div className="mt-2">
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={classForSubmitBtn}
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
