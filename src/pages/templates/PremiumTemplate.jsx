import React, { useState, useEffect, useRef } from 'react';
import {
  FaMapMarkerAlt,
  FaDownload,
  FaCalendarAlt,
  FaPhone,
  FaBed,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaTree,
  FaChevronDown,
  FaChevronUp,
  FaRoute
} from "react-icons/fa";
import { SiClubhouse } from "react-icons/si";
import { GiPowerGenerator } from "react-icons/gi";
import ContactPopupForm from '../../components/common/page-componets/ContactPopupForm';

export const PremiumTemplate = ({ venture, theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const marqueeRef = useRef(null);

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  // Improved scrolling text effect
  useEffect(() => {
    let animationId;
    let position = 0;
    const speed = 0.5; // Slower speed for smoother animation
    
    const animate = () => {
      position = (position + speed) % 100;
      setScrollPosition(position);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with improved gradient overlay */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${venture.banner_image || venture.image[0]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: 'scale(1.05)',
            filter: 'brightness(0.95) contrast(1.1)'
          }}
        />
        {/* Improved Logo Section with glass morphism */}
        {venture.premium_logo && (
          <div className="absolute top-8 left-8 z-10">
            <div className="bg-white/20 dark:bg-white/15 backdrop-blur-xl rounded-xl p-4 border border-white/40 dark:border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <img 
                src={venture.premium_logo} 
                alt="Premium Property Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        )}
        {/* Enhanced Hero Content with better spacing and typography */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-shadow-lg">
                  {venture.name}
                </h1>
                <div className="flex items-center text-xl mb-4 md:mb-6 text-shadow-md">
                  <FaMapMarkerAlt className="mr-3 text-white/90" />
                  <span className="font-light tracking-wide">{venture.distance}</span>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-8 text-lg md:text-xl text-shadow-md">
                  <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaBed className="mr-3 text-white/90" />
                    <span className="font-light">{venture.number_of_beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaBath className="mr-3 text-white/90" />
                    <span className="font-light">{venture.number_of_bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaParking className="mr-3 text-white/90" />
                    <span className="font-light">{venture.parking_space} Parking</span>
                  </div>
                </div>
              </div>
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-0">
                <button
                  className="px-8 py-4 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: theme.textColor,
                  }}
                >
                  <FaCalendarAlt className="mr-3" />
                  Schedule a Visit
                </button>
                <button
                  className="border-2 border-white/80 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                  style={{
                    color: theme.textColor,
                  }}
                  onClick={() => window.open(venture.brochure, "_blank")}
                >
                  <FaDownload className="mr-3" />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      {/* {venture.testimonials && venture.testimonials.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-16">
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-white border border-white/20 dark:border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 relative pb-3">
              Client Testimonials
              <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="text-2xl font-light italic leading-relaxed">
                  "{venture.testimonials[0].text}"
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img 
                      src={venture.testimonials[0].avatar || '/default-avatar.png'} 
                      alt={venture.testimonials[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{venture.testimonials[0].name}</div>
                    <div className="text-gray-300 text-sm">{venture.testimonials[0].designation}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {venture.testimonials[0].keywords?.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm shadow-sm"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
                <div
                  className="absolute inset-0"
                  dangerouslySetInnerHTML={{
                    __html: venture.testimonials[0].video.replace(
                      'width="560"',
                      'width="100%"'
                    ).replace(
                      'height="315"',
                      'height="100%"'
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            {/* Enhanced Overview */}
            <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
              <h2 className="text-3xl font-bold mb-6 relative pb-3 text-gray-900 dark:text-white">
                Project Overview
                <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                {venture.description}
              </p>
            </div>

            {/* Enhanced Image Gallery */}
            {venture.image && venture.image.length > 0 && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Image Gallery
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="space-y-6">
                  {/* Main Preview with enhanced styling */}
                  <div className="relative h-[calc(100vw*16/9)] max-h-[600px] rounded-xl overflow-hidden group shadow-2xl">
                    <img
                      src={venture.image[currentImageIndex]}
                      alt={`Gallery Preview`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    {/* Enhanced Navigation Arrows */}
                    <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + venture.image.length) % venture.image.length)}
                        className="p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-colors duration-300 transform hover:scale-110"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % venture.image.length)}
                        className="p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-colors duration-300 transform hover:scale-110"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Enhanced Image Counter */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-sm font-medium">
                      {currentImageIndex + 1} / {venture.image.length}
                    </div>
                  </div>

                  {/* Enhanced Thumbnails */}
                  <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                      {venture.image.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                            currentImageIndex === index ? 'ring-2 ring-offset-2 ring-offset-gray-900 scale-105' : ''
                          }`}
                          style={{ ringColor: currentImageIndex === index ? theme.primaryColor : '' }}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute inset-0 transition-all duration-300 ${
                              currentImageIndex === index ? 'bg-transparent' : 'bg-black/40 hover:bg-black/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Video Gallery */}
            {venture.video && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Video Tour
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
                  <div
                    className="absolute inset-0"
                    dangerouslySetInnerHTML={{
                      __html: venture.video.replace(
                        'width="560"',
                        'width="100%"'
                      ).replace(
                        'height="315"',
                        'height="100%"'
                      )
                    }}
                  />
                </div>
              </div>
            )}

            {/* Enhanced Amenities */}
            {venture.features && venture.features.length > 0 && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Amenities & Features
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {venture.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 border border-white/5 hover:border-white/20 transform hover:scale-105"
                    >
                      <div className="p-3 rounded-lg shadow-md" style={{ backgroundColor: theme.primaryColor }}>
                        {getAmenityIcon(feature)}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Layouts */}
            {venture.layouts && venture.layouts.length > 0 && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Floor Plans & Layouts
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {venture.layouts.map((layout, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-white/5 hover:border-white/20 transform hover:scale-102 transition-all"
                    >
                      <div className="relative">
                        <img
                          src={layout.img}
                          alt={layout.name}
                          className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{layout.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Location Map */}
            {venture.location_map && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Location
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="bg-white/5 dark:bg-black/20 rounded-xl p-4 border border-white/10 dark:border-white/5">
                  <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                    <div
                      className="absolute inset-0"
                      dangerouslySetInnerHTML={{
                        __html: venture.location_map.replace(
                          'width="600"',
                          'width="100%"'
                        ).replace(
                          'height="450"',
                          'height="100%"'
                        ).replace(
                          'style="border:0;"',
                          'style="border:0; width: 100%; height: 100%;"'
                        )
                      }}
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-white/10 shadow-md">
                        <FaMapMarkerAlt className="text-2xl" style={{ color: theme.primaryColor }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                        <p className="text-gray-700 dark:text-gray-200">{venture.distance}</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-white/10 shadow-md">
                        <FaCalendarAlt className="text-2xl" style={{ color: theme.primaryColor }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                        <button 
                          className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          Schedule Site Visit
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Legal Compliance */}
            {venture.legal_compliance && venture.legal_compliance.length > 0 && (
              <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Legal Compliance
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {venture.legal_compliance.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.key}</h3>
                      <p className="text-gray-700 dark:text-gray-200">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced More Details */}
            {venture.more_details && venture.more_details.length > 0 && (
              <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Additional Details
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {venture.more_details.map((detail, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{detail.key}</h3>
                      <p className="text-gray-700 dark:text-gray-200">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced FAQ Section */}
            {venture.faqs && venture.faqs.length > 0 && (
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 text-gray-800 dark:text-white border border-white/20 dark:border-white/10 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:border-white/30 dark:hover:border-white/20 mb-8">
                <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
                  Frequently Asked Questions
                  <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                </h2>
                <div className="space-y-4">
                  {venture.faqs.map((faq, index) => (
                    <div key={index} className="bg-white/5 dark:bg-black/20 rounded-xl overflow-hidden border border-white/10 dark:border-white/5 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300">
                      <button
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-300"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      >
                        <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                        {activeFaq === index ? (
                          <FaChevronUp className="flex-shrink-0 ml-4 text-sm opacity-70" />
                        ) : (
                          <FaChevronDown className="flex-shrink-0 ml-4 text-sm opacity-70" />
                        )}
                      </button>
                      {activeFaq === index && (
                        <div className="px-6 py-4 bg-white/5 dark:bg-black/20 animate-fadeIn">
                          <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced CTA Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all duration-500 hover:shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Ready to make this property your new home?
                </h2>
                <p className="text-lg mb-6 md:mb-8 text-gray-600 dark:text-gray-300">
                  Contact our sales team today to schedule a visit or to get more information about this amazing property.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleOpenPopup('schedule')}
                    className="w-full px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300"
                    style={{
                      backgroundColor: theme.primaryColor,
                      color: theme.textColor
                    }}
                  >
                    <FaCalendarAlt className="mr-3" />
                    Schedule a Visit
                  </button>
                  <button
                    onClick={() => handleOpenPopup('contact')}
                    className="w-full px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300 bg-transparent"
                    style={{
                      border: `2px solid ${theme.primaryColor}`,
                      color: theme.primaryColor
                    }}
                  >
                    <FaPhone className="mr-3" />
                    Contact Sales Team
                  </button>
                </div>
                
                {/* Premium badge */}
                <div className="mt-8 flex justify-center">
                  <div className="rounded-full px-6 py-3 flex items-center bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
                      Premium Property
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Map Section */}
      {venture.route_map && (
        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 relative pb-3 text-gray-900 dark:text-white">
            Route Map & Nearby Places
            <span className="absolute bottom-0 left-0 w-24 h-1 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
          </h2>
          <div className="relative rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <img
              src={venture.route_map}
              alt="Route Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <FaRoute className="text-gray-700 dark:text-gray-200" />
              <span className="text-gray-900 dark:text-white text-sm font-medium">Route Map</span>
            </div>
          </div>
        </div>
      )}

      <ContactPopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        propertyName={venture.name}
      />
    </div>
  );
};

const getAmenityIcon = (feature) => {
  const amenities = {
    "Swimming Pool": <FaSwimmingPool />,
    "Fitness Center": <FaDumbbell />,
    "24/7 Security": <FaShieldAlt />,
    "Parking Space": <FaParking />,
    "Garden Area": <FaTree />,
    "Clubhouse": <SiClubhouse />,
    "Power Backup": <GiPowerGenerator />
  };
  return amenities[feature] || "?";
}; 