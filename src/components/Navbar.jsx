import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";
import logo from "../assets/Logo.png";
import useAdmin from "../hooks/useAdmin";
import ThemeToggle from "../ThemeToggle ";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Signed Out",
              text: "You have been successfully signed out!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/");
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: `Sign-out failed: ${error.message}`,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar sticky z-10 top-0 opacity-80 bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800 text-white shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center space-x-2 ml-2">
        <Link to="/">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        </Link>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-base lg:text-xl text-white hover:text-blue-400"
        >
          PRODUCT HUNT
        </Link>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allProducts"
              className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
        
      </div>
      
      {/* Navbar End */}
      <div className="navbar-end hidden lg:flex items-center space-x-2">
      <ThemeToggle></ThemeToggle>
        {user ? (
          <div className="relative group flex items-center">
            <img
              src={
                user.photoURL || "https://via.placeholder.com/40?text=Avatar"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            />
            <div className="hidden group-hover:flex items-center absolute top-8 right-0 bg-slate-500 z-10 text-white p-2 rounded shadow-lg w-80">
              <span className="block mr-1 ">
                {user.displayName || user.email}
              </span>
              <button
                onClick={() => {
                  if (isAdmin) {
                    navigate("/dashboard/adminStatistics");
                  } else {
                    navigate("/dashboard/myProducts");
                  }
                }}
                className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-1 btn rounded mt-2 mr-1"
              >
                Dashboard
              </button>
              <button
                className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-1 btn rounded mt-2"
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              className="bg-sunflower-yellow hover:bg-dark-sunflower-yellow text-deep-blue px-4 py-1 rounded"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="bg-sunflower-yellow hover:bg-dark-sunflower-yellow text-deep-blue px-4 py-1 rounded"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
      {/* Hamburger Menu */}
      <div className="lg:hidden ml-auto">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start bg-gray-800 p-2  text-white absolute top-20 left-8 right-8 z-10 shadow-lg">
          <ul className="menu flex flex-col w-full">
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allProducts"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-white hover:text-blue-400 focus:text-white active:text-white visited:text-white"
              >
                FAQ
              </Link>
            </li>
          </ul>
          <ThemeToggle></ThemeToggle>
          <div className="flex items-center mt-4 w-full">
            
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="mr-2">{user.displayName || user.email}</span>
                <button
                  onClick={() => {
                    navigate("/dashboard/myProducts");
                  }}
                  className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-1 btn rounded mt-2 mr-1"
                >
                  Dashboard
                </button>
                <button
                  className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-1 btn rounded mt-2"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col">
                <Link
                  to="/login"
                  className="btn bg-sunflower-yellow text-dark-charcoal hover:bg-dark-sunflower-yellow w-full"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn bg-sunflower-yellow text-dark-charcoal hover:bg-dark-sunflower-yellow w-full mt-2"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
