import React, { useState } from "react";
import {
  FaEnvelope,
  FaHome,
  FaList,
  FaMoneyCheckAlt,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaVoicemail,
} from "react-icons/fa";
import { FaAddressBook, FaBook, FaCalendar } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 text-white min-h-screen bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800">
        <ul className="menu">
          {isAdmin ? (
            <></>
          ) : (
            <>
              <li>
                <NavLink to={"/dashboard/addProduct"}>
                  <FaAddressBook></FaAddressBook>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/myProducts"}>
                  <FaBook></FaBook>
                  My Products{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/profile"}>
                  <FaUsers></FaUsers>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/allUsers"}>
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to={"/dashboard/contact"}>
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
