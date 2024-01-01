import React from "react";
import { classForInput, classForLabel } from "./css_classes";

function Register() {
  return (
    <section>
      <div className="container mx-auto px-4">



        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
            Register Yourself!
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
            <form>
              <div>
                <div className="mb-4">
                  <label
                    for="name"
                    className={classForLabel}
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={classForInput}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    for="email"
                    className={classForLabel}
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={classForInput}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    for="phone"
                    className={classForLabel}
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      className={classForInput}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    for="phone"
                    className={classForLabel}
                  >
                    Gender
                  </label>
                  <div className="mt-2 flex gap-6">
                    <div className="flex gap-2">
                      <label>Male</label> <input type="radio" name="radio-1" className="radio" />
                    </div>
                    <div className="flex gap-2">
                      <label>Female</label> <input type="radio" name="radio-1" className="radio" />
                    </div>
                    <div className="flex gap-2">
                      <label>Others</label> <input type="radio" name="radio-1" className="radio" />
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
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            for="linkedin"
                            className="font-medium text-gray-900"
                          >
                            Linekdin
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="friends"
                            name="friends"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            for="friends"
                            className="font-medium text-gray-900"
                          >
                            Friends
                          </label>

                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="jobportal"
                            name="jobportal"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            for="jobportal"
                            className="font-medium text-gray-900"
                          >
                            Job Portal
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="others"
                            name="others"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            for="others"
                            className="font-medium text-gray-900"
                          >
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="mb-4">
                  <label
                    for="city"
                    className={classForLabel}
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <select
                      id="city"
                      name="city"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Ahmedabad</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    for="state"
                    className={classForLabel}
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <select
                      id="state"
                      name="state"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
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
