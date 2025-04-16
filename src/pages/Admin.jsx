import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PropertyForm = () => {
  // Check for existing property data in localStorage
  const existingProperty = localStorage.getItem('propertyToEdit');
  const initialState = {
    name: "",
    distance: "",
    price: "",
    description: "",
    image: [],
    brochure: "",
    parking_space: "",
    banner_image: "",
    features: [],
    layouts: [],
    video: "",
    location_map: "",
    legal_compliance: [],
    number_of_beds: "",
    number_of_bathrooms: "",
    more_details: [],
    category: "",
    premium_color: "",
    median_color: "",
    normal_color: "",
    premium_logo: "",
    faqs: []
  };

  // Update the global styles for dark mode
  const inputStyle = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] transition-colors text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800";
  const textareaStyle = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] transition-colors text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800";
  const flexInputStyle = "flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b38f4f] focus:border-[#b38f4f] transition-colors text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800";

  const parsedExistingProperty = existingProperty ? JSON.parse(existingProperty) : null;
  // Remove _id from existing property to ensure a new one is generated
  if (parsedExistingProperty) {
    delete parsedExistingProperty._id;
  }

  const [property, setProperty] = useState(parsedExistingProperty || initialState);
  const [currentLayout, setCurrentLayout] = useState({ img: "", name: "" });
  const [currentCompliance, setCurrentCompliance] = useState({ key: "", value: "" });
  const [uploading, setUploading] = useState(false);
  const [currentMoreDetail, setCurrentMoreDetail] = useState({ key: "", value: "" });
  const [currentFaq, setCurrentFaq] = useState({ question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(!!existingProperty);
  
  // Predefined features for dropdown
  const predefinedFeatures = [
    "Swimming Pool",
    "Fitness Center",
    "24/7 Security",
    "Parking Space",
    "Garden Area",
    "Clubhouse",
    "Power Backup"
  ];

  // Clear localStorage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('propertyToEdit');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'realestate');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxvjbmgta/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const currentImages = [...property.image];
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUploads = uploadedUrls.filter(url => url !== null);
      
      setProperty(prev => ({
        ...prev,
        image: [...currentImages, ...successfulUploads]
      }));
    } catch (error) {
      console.error("Error handling image uploads:", error);
      alert("Failed to upload some images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        setProperty(prev => ({
          ...prev,
          banner_image: uploadedUrl
        }));
      }
    } catch (error) {
      console.error("Error uploading banner image:", error);
      alert("Failed to upload banner image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFeatureToggle = (feature) => {
    setProperty(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addLayout = () => {
    if (currentLayout.img && currentLayout.name) {
      setProperty(prev => ({
        ...prev,
        layouts: [...prev.layouts, { ...currentLayout }]
      }));
      setCurrentLayout({ img: "", name: "" });
    }
  };

  const handleLayoutChange = (e) => {
    const { name, value } = e.target;
    setCurrentLayout(prev => ({ ...prev, [name]: value }));
  };

  const handleLayoutImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        setCurrentLayout(prev => ({
          ...prev,
          img: uploadedUrl
        }));
      }
    } catch (error) {
      console.error("Error uploading layout image:", error);
      alert("Failed to upload layout image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const addCompliance = () => {
    if (currentCompliance.key && currentCompliance.value) {
      setProperty(prev => ({
        ...prev,
        legal_compliance: [...prev.legal_compliance, { ...currentCompliance }]
      }));
      setCurrentCompliance({ key: "", value: "" });
    }
  };

  const handleComplianceChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompliance(prev => ({ ...prev, [name]: value }));
  };

  const addMoreDetail = () => {
    if (currentMoreDetail.key && currentMoreDetail.value) {
      setProperty(prev => ({
        ...prev,
        more_details: [...prev.more_details, { ...currentMoreDetail }]
      }));
      setCurrentMoreDetail({ key: "", value: "" });
    }
  };

  const removeMoreDetail = (index) => {
    setProperty(prev => ({
      ...prev,
      more_details: prev.more_details.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    if (currentFaq.question && currentFaq.answer) {
      setProperty(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...currentFaq }]
      }));
      setCurrentFaq({ question: "", answer: "" });
    }
  };

  const handleFaqChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq(prev => ({ ...prev, [name]: value }));
  };

  const removeFaq = (index) => {
    setProperty(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploading) {
      alert("Please wait for images to finish uploading");
      return;
    }
    
    try {
      // Remove any existing _id to ensure a new one is generated
      const propertyData = { ...property };
      delete propertyData._id;

      const response = await fetch(
        "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/add-property",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...propertyData,
            createdAt: new Date().toISOString()
          }),
        }
      );
      const data = await response.json();
      
      if (data.success) {
        alert("Property added successfully!");
        setProperty(initialState);
        localStorage.removeItem('propertyToEdit');
        setIsEditing(false);
        
        // Redirect to Showcase tab after successful save
        if (window.location.pathname === '/admin') {
          window.location.reload();
        } else {
          window.location.href = '/admin';
        }
      } else {
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const removeLayout = (index) => {
    setProperty(prev => ({
      ...prev,
      layouts: prev.layouts.filter((_, i) => i !== index)
    }));
  };

  const removeCompliance = (index) => {
    setProperty(prev => ({
      ...prev,
      legal_compliance: prev.legal_compliance.filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index) => {
    setProperty(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isEditing ? "Edit Property" : "Add New Property"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isEditing ? "Update the property details below" : "Fill in the details below to add a new property listing"}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-[#b38f4f] text-white px-6 py-3 rounded-lg hover:bg-[#94723e] transition-colors flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="mr-2" />
          {uploading ? "Uploading..." : (isEditing ? "Save as New" : "Add Property")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Basic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Venture Name</label>
              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Enter venture name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Distance</label>
              <input
                type="text"
                name="distance"
                value={property.distance}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="e.g., 5km from city center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number +91(Number)</label>
              <input
                type="text"
                name="price"
                value={property.price}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Enter property price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parking Space</label>
              <input
                type="text"
                name="parking_space"
                value={property.parking_space}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter available parking spaces"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brochure URL</label>
              <input
                type="text"
                name="brochure"
                value={property.brochure}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter brochure PDF URL"
              />
            </div>
          </div>
        </div>

        {/* Category & Theme Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Category & Theme
          </h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Category</label>
              <select
                name="category"
                value={property.category}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select Category</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            {property.category === "Premium" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Premium Theme Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      name="premium_color"
                      value={property.premium_color || "#ff6b00"}
                      onChange={handleChange}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      name="premium_color"
                      value={property.premium_color || "#ff6b00"}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Color code (e.g., #ff6b00)"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Premium Logo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#b38f4f] transition-colors">
                    <div className="space-y-1 text-center">
                      <input
                        type="file"
                        name="premium_logo"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploading(true);
                            try {
                              const uploadedUrl = await uploadToCloudinary(file);
                              if (uploadedUrl) {
                                setProperty(prev => ({
                                  ...prev,
                                  premium_logo: uploadedUrl
                                }));
                              }
                            } catch (error) {
                              console.error("Error uploading logo:", error);
                              alert("Failed to upload logo. Please try again.");
                            } finally {
                              setUploading(false);
                            }
                          }
                        }}
                        className="hidden"
                        id="premium-logo"
                        accept="image/*"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="premium-logo"
                        className="cursor-pointer bg-white rounded-md font-medium text-[#b38f4f] hover:text-[#94723e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#b38f4f]"
                      >
                        <span>Upload logo</span>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    </div>
                  </div>
                  {property.premium_logo && (
                    <div className="mt-4">
                      <div className="relative group">
                        <img 
                          src={property.premium_logo} 
                          alt="Premium logo preview" 
                          className="h-16 object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setProperty(prev => ({ ...prev, premium_logo: '' }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {property.category === "Median" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Median Theme Color</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    name="median_color"
                    value={property.median_color || "#4a90e2"}
                    onChange={handleChange}
                    className="h-10 w-20"
                  />
                  <input
                    type="text"
                    name="median_color"
                    value={property.median_color || "#4a90e2"}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Color code (e.g., #4a90e2)"
                  />
                </div>
              </div>
            )}

            {property.category === "Normal" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Normal Theme Color</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    name="normal_color"
                    value={property.normal_color || "#ff6b00"}
                    onChange={handleChange}
                    className="h-10 w-20"
                  />
                  <input
                    type="text"
                    name="normal_color"
                    value={property.normal_color || "#ff6b00"}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Color code (e.g., #ff6b00)"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Property Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedrooms</label>
              <input
                type="text"
                name="number_of_beds"
                value={property.number_of_beds}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Number of bedrooms"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bathrooms</label>
              <input
                type="text"
                name="number_of_bathrooms"
                value={property.number_of_bathrooms}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Number of bathrooms"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className={textareaStyle}
                rows="4"
                required
                placeholder="Enter property description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Media
          </h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Banner Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#b38f4f] transition-colors">
                <div className="space-y-1 text-center">
                  <input
                    type="file"
                    name="banner_image"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                    id="banner-upload"
                    accept="image/*"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer bg-white rounded-md font-medium text-[#b38f4f] hover:text-[#94723e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#b38f4f]"
                  >
                    <span>Upload a file</span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>
              {property.banner_image && (
                <div className="mt-4">
                  <img 
                    src={property.banner_image} 
                    alt="Banner preview" 
                    className="max-h-40 rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#b38f4f] transition-colors">
                <div className="space-y-1 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="property-images"
                    accept="image/*"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="property-images"
                    className="cursor-pointer bg-white rounded-md font-medium text-[#b38f4f] hover:text-[#94723e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#b38f4f]"
                  >
                    <span>Upload multiple files</span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>
              {property.image.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {property.image.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Property ${index}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm" 
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            title="Delete Image"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">YouTube Video URL</label>
              <input
                type="text"
                name="video"
                value={property.video}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter YouTube video URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location Map URL</label>
              <input
                type="text"
                name="location_map"
                value={property.location_map}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter Google Maps embed URL"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Features & Amenities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {predefinedFeatures.map(feature => (
              <button
                key={feature}
                type="button"
                onClick={() => handleFeatureToggle(feature)}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  property.features.includes(feature)
                    ? 'border-[#b38f4f] bg-[#b38f4f] text-white'
                    : 'border-gray-200 hover:border-[#b38f4f]'
                }`}
              >
                <span className="font-medium">{feature}</span>
                {property.features.includes(feature) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b38f4f]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* More Details Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Additional Details
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="key"
                value={currentMoreDetail.key}
                onChange={(e) => setCurrentMoreDetail(prev => ({ ...prev, key: e.target.value }))}
                placeholder="Detail Title"
                className={flexInputStyle}
              />
              <input
                type="text"
                name="value"
                value={currentMoreDetail.value}
                onChange={(e) => setCurrentMoreDetail(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Detail Value"
                className={flexInputStyle}
              />
              <button
                type="button"
                onClick={addMoreDetail}
                className="bg-[#b38f4f] text-white px-6 py-3 rounded-lg hover:bg-[#94723e] transition-colors shadow-md hover:shadow-lg"
              >
                Add Detail
              </button>
            </div>
            {property.more_details.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Added Details:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.more_details.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                      <span className="text-sm"><span className="font-medium">{detail.key}:</span> {detail.value}</span>
                      <button
                        type="button"
                        onClick={() => removeMoreDetail(index)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layouts Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Floor Plans & Layouts
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#b38f4f] transition-colors">
                  <div className="space-y-1 text-center">
                    <input
                      type="file"
                      onChange={handleLayoutImageUpload}
                      className="hidden"
                      id="layout-upload"
                      accept="image/*"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="layout-upload"
                      className="cursor-pointer bg-white rounded-md font-medium text-[#b38f4f] hover:text-[#94723e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#b38f4f]"
                    >
                      <span>Upload layout image</span>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </div>
                {currentLayout.img && (
                  <div className="mt-4">
                    <div className="relative group">
                      <img 
                        src={currentLayout.img} 
                        alt="Layout preview" 
                        className="h-32 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setCurrentLayout(prev => ({ ...prev, img: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <input
                type="text"
                name="name"
                value={currentLayout.name}
                onChange={handleLayoutChange}
                placeholder="Layout Name"
                className={flexInputStyle}
              />
              <button
                type="button"
                onClick={addLayout}
                className="bg-[#b38f4f] text-white px-6 py-3 rounded-lg hover:bg-[#94723e] transition-colors shadow-md hover:shadow-lg"
              >
                Add Layout
              </button>
            </div>
            {property.layouts.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Added Layouts:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.layouts.map((layout, index) => (
                    <div key={index} className="flex flex-col bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{layout.name}</span>
                        <button
                          type="button"
                          onClick={() => removeLayout(index)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <img 
                        src={layout.img} 
                        alt={layout.name}
                        className="w-full h-32 object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal Compliance Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            Legal Compliance
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="key"
                value={currentCompliance.key}
                onChange={handleComplianceChange}
                placeholder="Compliance Type"
                className={flexInputStyle}
              />
              <input
                type="text"
                name="value"
                value={currentCompliance.value}
                onChange={handleComplianceChange}
                placeholder="Compliance Details"
                className={flexInputStyle}
              />
              <button
                type="button"
                onClick={addCompliance}
                className="bg-[#b38f4f] text-white px-6 py-3 rounded-lg hover:bg-[#94723e] transition-colors shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </div>
            {property.legal_compliance.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Added Compliance Items:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.legal_compliance.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                      <span className="text-sm">{item.key}: {item.value}</span>
                      <button
                        type="button"
                        onClick={() => removeCompliance(index)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-1 h-6 bg-[#b38f4f] rounded-full mr-3"></span>
            FAQs
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="question"
                value={currentFaq.question}
                onChange={handleFaqChange}
                placeholder="FAQ Question"
                className={flexInputStyle}
              />
              <input
                type="text"
                name="answer"
                value={currentFaq.answer}
                onChange={handleFaqChange}
                placeholder="FAQ Answer"
                className={flexInputStyle}
              />
              <button
                type="button"
                onClick={addFaq}
                className="bg-[#b38f4f] text-white px-6 py-3 rounded-lg hover:bg-[#94723e] transition-colors shadow-md hover:shadow-lg"
              >
                Add FAQ
              </button>
            </div>
            {property.faqs.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Added FAQs:</h5>
                <div className="grid grid-cols-1 gap-3">
                  {property.faqs.map((faq, index) => (
                    <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-gray-100">{faq.question}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{faq.answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;