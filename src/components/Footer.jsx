import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/Logo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Address Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-lg font-semibold mb-2">Address:</h2>
            <p>Patherghata</p>
            <p> Chattogram-4000</p>
            <p>Phone: (031) 456-7890</p>
          </div>
          
          {/* Logo Section */}
          <div className="w-full sm:w-1/3 flex flex-col items-center mb-6 sm:mb-0">
            <img src={logo} alt="Library Logo" className="h-16 mb-2" />
            <h1 className="text-xl font-bold">Product Hunt</h1>
          </div>
          
          {/* Social Media Section */}
          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-col gap-8 items-center mt-8 border-t border-gray-700 pt-4">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
          
          <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Product Hunt. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
