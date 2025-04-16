import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const TestimonialsManager = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: '',
    designation: '',
    text: '',
    avatar: '',
    keywords: []
  });
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch testimonials when property is selected
  useEffect(() => {
    if (selectedProperty) {
      fetchTestimonials();
    }
  }, [selectedProperty]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties"
      );
      const data = await response.json();
      if (data.success) {
        setProperties(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-testimonials/${selectedProperty}`
      );
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedProperty) {
      alert('Please select a property first');
      return;
    }

    try {
      const response = await fetch(
        `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/add-testimonial/${selectedProperty}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentTestimonial),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
        resetForm();
      } else {
        alert(data.error || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert('Failed to save testimonial');
    }
  };

  const handleDelete = async (testimonialId) => {
    if (!selectedProperty || !testimonialId || !window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-testimonial/${selectedProperty}/${testimonialId}`,
        {
          method: "DELETE",
        }
      );
      
      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
      } else {
        alert(data.error || 'Failed to delete testimonial');
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial({
      name: testimonial.name,
      designation: testimonial.designation,
      text: testimonial.text,
      avatar: testimonial.avatar,
      keywords: testimonial.keywords || []
    });
    setEditingId(testimonial._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentTestimonial({
      name: '',
      designation: '',
      text: '',
      avatar: '',
      keywords: []
    });
    setIsEditing(false);
    setEditingId(null);
    setCurrentKeyword('');
  };

  const addKeyword = () => {
    if (currentKeyword.trim()) {
      setCurrentTestimonial(prev => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()]
      }));
      setCurrentKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setCurrentTestimonial(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  const renderTemplate = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Selection and Testimonial Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Venture
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
              required
            >
              <option value="">Select a property</option>
              {properties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          {selectedProperty && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={currentTestimonial.name}
                  onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={currentTestimonial.designation}
                  onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
                  placeholder="e.g. Business Owner, Real Estate Investor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Testimonial Text
                </label>
                <textarea
                  value={currentTestimonial.text}
                  onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={currentTestimonial.avatar}
                  onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, avatar: e.target.value }))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] text-gray-900 dark:text-white"
                    placeholder="Add keyword"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="p-3 bg-[#b38f4f] text-white rounded-lg hover:bg-[#94723e]"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentTestimonial.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#d4b77d] dark:bg-[#94723e]/20 text-[#94723e] dark:text-[#d4b77d] rounded-full"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(index)}
                        className="ml-2 text-[#b38f4f] hover:text-[#94723e]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#b38f4f] text-white px-6 py-2 rounded-lg hover:bg-[#94723e] transition-colors"
                >
                  {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Testimonials List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Existing Testimonials</h3>
          {selectedProperty ? (
            testimonials.length > 0 ? (
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {testimonial.avatar && (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-avatar.png';
                            }}
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          {testimonial.designation && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.designation}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 text-[#b38f4f] hover:text-[#94723e]"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{testimonial.text}</p>
                    {testimonial.keywords && testimonial.keywords.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {testimonial.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-sm bg-[#d4b77d] dark:bg-[#94723e]/20 text-[#94723e] dark:text-[#d4b77d] rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No testimonials found for this property.</p>
            )
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Please select a property to view testimonials.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderTemplate()}
    </div>
  );
};

export default TestimonialsManager; 