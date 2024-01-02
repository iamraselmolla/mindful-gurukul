import React from "react";
import Input from "../shared/Input";
import { classForLabel } from "../shared/css_classes";

function Login() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
            Login!
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
            <form>
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className={classForLabel}>
                    Email
                  </label>
                  <div className="mt-2">
                    <Input type="email" name="email" id="email" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className={classForLabel}>
                    Password
                  </label>
                  <div className="mt-2">
                    <Input type="password" name="password" id="password" />
                  </div>
                </div>
              </div>
            </form>
            <div className="flex justify-center items-center">
              <img src="images/login.png" className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
