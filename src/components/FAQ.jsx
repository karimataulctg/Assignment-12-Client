import React from 'react';

const FAQ = () => {
  return (
    <div className="faq-page  flex flex-col items-center justify-center  m-6">
      <div className="card rounded-lg shadow-md max-w-full w-full p-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
    <div className="mb-4 px-6">
        <h2 className="text-xl font-semibold">Q: What is Product Hut?</h2>
        <p>A: Product Hut is a platform where you can discover and share innovative products. Whether you are a creator or a consumer, Product Hut helps you connect with the latest and greatest products.</p>
    </div>
    <div className="mb-4 px-6">
        <h2 className="text-xl font-semibold">Q: How do I create an account?</h2>
        <p>A: Creating an account is easy! Just click on the "Sign Up" button at the top of the page and fill in your details.</p>
    </div>
    <div className="mb-4 px-6">
        <h2 className="text-xl font-semibold">Q: How do I submit a product?</h2>
        <p>A: Once you have an account, click on the "Submit Product" button and fill in the required information about your product. Our team will review your submission and publish it if it meets our guidelines.</p>
    </div>
</div>

    </div>
  );
};

export default FAQ;
