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
    video: '',
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
    try {
      const endpoint = isEditing 
        ? `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/update-testimonial/${editingId}`
        : "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/add-testimonial";
      
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: selectedProperty,
          ...currentTestimonial
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await fetch(
          `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-testimonial/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchTestimonials();
        }
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setEditingId(testimonial.id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentTestimonial({
      name: '',
      designation: '',
      text: '',
      video: '',
      avatar: '',
      keywords: []
    });
    setIsEditing(false);
    setEditingId(null);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Property Selection and Testimonial Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Add/Edit Testimonial</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Property
          </label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="">Select a property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProperty && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={currentTestimonial.name}
                onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={currentTestimonial.designation}
                onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, designation: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Text
              </label>
              <textarea
                value={currentTestimonial.text}
                onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, text: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={currentTestimonial.video}
                onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, video: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                value={currentTestimonial.avatar}
                onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, avatar: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add keyword"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentTestimonial.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                {isEditing ? (
                  <>
                    <FaEdit className="mr-2" />
                    Update Testimonial
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Add Testimonial
                  </>
                )}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Testimonials List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Existing Testimonials</h3>
        {selectedProperty ? (
          testimonials.length > 0 ? (
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.avatar || '/default-avatar.png'}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.designation}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="p-2 text-orange-600 hover:text-orange-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{testimonial.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {testimonial.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No testimonials found for this property.</p>
          )
        ) : (
          <p className="text-gray-500 text-center py-8">Select a property to view testimonials.</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManager; 