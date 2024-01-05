import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Header() {
  const { handleLogout, login } = useContext(AuthContext)
  console.log(login)
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard" >Dashboard</Link>
              </li>

            </ul>
          </div>
          <Link to="/">
            <a className="btn btn-ghost text-xl">Mindful Gurukul</a></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/dashboard" >Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!login ? <>
            <Link to="/register" className="btn mr-4">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </> : <>
            <button onClick={handleLogout} className="btn mr-4">
              Logout
            </button>
          </>}
        </div>
      </div>
    </>
  );
}

export default Header;
