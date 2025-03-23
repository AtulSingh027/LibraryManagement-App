import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide hover:text-gray-200 transition duration-300">
          Bookies.in
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-indigo-200 hover:underline hover:underline-offset-4 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Login"
              className="text-white text-lg font-medium hover:text-indigo-200 hover:underline hover:underline-offset-4 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/Signup"
              className="text-white text-lg font-medium hover:text-indigo-200 hover:underline hover:underline-offset-4 transition duration-300"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/LibraryDashboard"
              className="text-white text-lg font-medium hover:text-indigo-200 hover:underline hover:underline-offset-4 transition duration-300"
            >
              DashBoard
            </Link>
          </li>

          <li>
            <Link
              to="/NewBook"
              className="text-white text-lg font-medium hover:text-indigo-200 hover:underline hover:underline-offset-4 transition duration-300"
            >
              AddNewBook
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}