import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for login status
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("user");
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TODO
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 dark:text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
