import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaBook,
  FaAddressBook,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <div className="flex">
      {/* Hamburger Menu Button (visible only on mobile) */}
      <button
        className="md:hidden p-4 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800 text-white p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to={"/dashboard/adminStatistics"}>
                  <FaUsers />
                  Admin Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/addCoupons"}>
                  <FaBook />
                  Add Coupons
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manageCoupons"}>
                  <FaBook />
                  Manage Coupons
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/allUsers"}>
                  <FaUsers />
                  Create Moderator
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/dashboard/addProduct"}>
                  <FaAddressBook />
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/myProducts"}>
                  <FaBook />
                  My Products
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/profile"}>
                  <FaUsers />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/productReview"}>
                  <FaBook />
                  Product Review
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/reportedContent"}>
                  <FaBook />
                  Reported Content
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/contact"}>
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
