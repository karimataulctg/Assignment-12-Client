import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Address:</h2>
          <p className="text-gray-600">Patherghata,</p>
          <p className="text-gray-600">Chattogram-4000</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Phone:</h2>
          <p className="text-gray-600">(031) 456-7890</p>
        </div>
        <div className="text-center">
          <button disabled className="btn btn-primary text-white px-4 py-2 rounded-lg shadow-md">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
