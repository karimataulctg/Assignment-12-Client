import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page min-h-screen flex flex-col items-center justify-center p-6">
      <div className=" card p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center ">Contact Us</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold ">Address:</h2>
          <p className="">Patherghata,</p>
          <p className="">Chattogram-4000</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold ">Phone:</h2>
          <p className="">(031) 456-7890</p>
        </div>
        <div className="text-center">
          <button disabled className="btn btn-primary  px-4 py-2 rounded-lg shadow-md">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
