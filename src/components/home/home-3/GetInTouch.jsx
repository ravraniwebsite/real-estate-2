import { useState, useEffect } from 'react';
import { sendEnquiryNotification } from '../../../utils/emailService';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [properties, setProperties] = useState([]);

  // Fetch properties for the email template
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/get-properties`
        );
        const data = await response.json();
        if (data.success) {
          setProperties(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare enquiry data with date
      const enquiryData = {
        ...formData,
        phone: 'Not provided',
        property: 'General Inquiry',
        date: new Date().toISOString().split('T')[0]
      };

      // Submit enquiry to server
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/enquire`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enquiryData),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        // Send email notification
        await sendEnquiryNotification(enquiryData, properties);
        
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-full w-full flex-1 basis-[18rem]">
          <img
            src="/images/property (39).jpg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 basis-[18rem] bg-secondary py-6 !text-slate-200">
          <div className="max-w-[350px] w-full mx-auto bg-[#0a5076] p-3 rounded-lg">
            <h1 className="text-lg font-semibold">Get in touch</h1>
            <p>
              For more inquiries or deals, just contact us using the form below,
              we will contact you back!
            </p>
            
            {success && (
              <div className="mt-4 p-2 bg-green-500/20 border border-green-500 rounded-md">
                <p className="text-green-300 text-center">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-2 bg-red-500/20 border border-red-500 rounded-md">
                <p className="text-red-300 text-center">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2 py-1 border-none rounded-md outline-none bg-secondary"
                placeholder="Your name.."
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1 mt-3 border-none rounded-md outline-none bg-secondary"
                placeholder="Your email.."
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 mt-3 border-none rounded-md outline-none bg-secondary"
                rows={3}
                placeholder="Your message.."
                required
              ></textarea>
              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-4 btn btn-primary"
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
