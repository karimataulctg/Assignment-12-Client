import React from 'react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Creator',
      text: 'Product Hunt has completely transformed how we launch our products. The community engagement and feedback we received here was invaluable!',
      image: 'https://i.ibb.co.com/W0bQRFV/Photo1.jpg',
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Tech Entrepreneur',
      text: 'Discovering innovative products here has helped us stay ahead of the curve. The quality of products and discussions is unmatched.',
      image: 'https://i.ibb.co.com/3r3sgG1/Photo6.jpg',
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Product Manager',
      text: 'As a product enthusiast, this platform has become my daily go-to. The ability to connect with creators directly is fantastic!',
      image: 'https://i.ibb.co.com/YpJv1t4/Photo4.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-base-200" data-theme="business">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">What Our Community Says</h1>
          <p className="text-xl text-gray-600">
            Hear from product creators and enthusiasts who've found success through our platform
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-4">
                    <div className="w-12 rounded-full">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm ">{testimonial.role}</p>
                  </div>
                </div>
                <p>"{testimonial.text}"</p>
                <div className="card-actions justify-end mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <button className="btn btn-primary btn-lg">
            Share Your Product Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TestimonialsPage;