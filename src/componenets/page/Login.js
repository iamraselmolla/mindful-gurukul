import React, { useContext } from "react";
import Input from "../shared/Input";
import { classForLabel, classForSubmitBtn } from "../shared/css_classes";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { findUserId } from "../utlis/checkUserInfo";

function Login() {
  const { setLogin, setUserId } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const result = await axios.post("https://mindful-gurukul-server-sandy.vercel.app/login", {
        email: email,
        password: password,
      });
      if (result.status === 200) {
        console.log(result.data)
        toast.success(result?.data?.message)
        navigate('/')
        const { id, login, name } = result?.data?.data
        localStorage.setItem('user', JSON.stringify({ id, name, login }))
        setLogin(true)
        setUserId(findUserId())

      }


      // You can add logic here to redirect the user or perform other actions
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error.response.data.message)
      }
      console.log(error.message);

      // Handle the error appropriately
      // For example, you can display an error message to the user
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
            Login!
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className={classForSubmitBtn}>
                  Login
                </button>
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
