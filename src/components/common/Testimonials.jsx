import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = ({ testimonials }) => {
  // const [testimonials, setTestimonials] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     if (!propertyId) {
  //       setLoading(false);
  //       return;
  //     }
      
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-testimonials/${propertyId}`
  //       );
        
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch testimonials');
  //       }

  //       const data = await response.json();
        
  //       if (data.success) {
  //         setTestimonials(data.data || []);
  //       } else {
  //         console.error('API Error:', data.error);
  //         setError('Failed to load testimonials');
  //       }
  //     } catch (err) {
  //       console.error('Error fetching testimonials:', err);
  //       setError('Failed to load testimonials');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTestimonials();
  // }, [propertyId]);

  // if (loading) {
  //   return (
  //     <div className="py-12 bg-gray-50 dark:bg-gray-800">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-center items-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error || !testimonials || testimonials.length === 0) {
  //   return null; // Don't show the section if there's an error or no testimonials
  // }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Read testimonials from our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-4 left-4 text-orange-500 opacity-20">
                <FaQuoteLeft size={24} />
              </div>
              
              <div className="mt-8">
                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    {testimonial.designation && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.designation}
                      </p>
                    )}
                  </div>
                </div>

                {testimonial.keywords && testimonial.keywords.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {testimonial.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 