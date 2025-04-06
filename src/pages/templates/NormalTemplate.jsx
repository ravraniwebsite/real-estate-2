import React, { useState } from 'react';
import {
  Hero,
  Overview,
  Amenities,
  Layouts,
  ImageSection,
  YoutubeEmbedVideo,
  GoogleMap,
  LegalCompilance,
  MoreDetails,
  CTA
} from '../DetailedPage';
import { FaCalendarAlt, FaPhone } from 'react-icons/fa';
import ContactPopupForm from '../../components/common/page-componets/ContactPopupForm';

export const NormalTemplate = ({ venture, theme }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  return (
    <div className="space-y-4">
      <Hero venture={venture} theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Testimonials Section */}
            {/* {venture.testimonials && venture.testimonials.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: theme.secondaryColor }}>
                    Client Testimonials
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="text-lg leading-relaxed text-gray-700">
                        "{venture.testimonials[0].text}"
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                          <img 
                            src={venture.testimonials[0].avatar || '/default-avatar.png'} 
                            alt={venture.testimonials[0].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{venture.testimonials[0].name}</div>
                          <div className="text-gray-500 text-sm">{venture.testimonials[0].designation}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {venture.testimonials[0].keywords?.map((keyword, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 rounded-md text-sm bg-gray-50 text-gray-600 border border-gray-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative rounded-md overflow-hidden border border-gray-100" style={{ paddingTop: '56.25%' }}>
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

            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <Overview venture={venture} theme={theme} />
            </div>
            {venture.features && venture.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <Amenities features={venture.features} theme={theme} />
              </div>
            )}
            {venture.layouts && venture.layouts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white pb-2 border-b-2" style={{ borderColor: theme.secondaryColor }}>
                    Floor Plans & Layouts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venture.layouts.map((layout, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={layout.img}
                          alt={layout.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{layout.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {venture.image && venture.image.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <ImageSection image={venture.image} theme={theme} />
              </div>
            )}
            {venture.video && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <YoutubeEmbedVideo video2={venture.video} theme={theme} />
              </div>
            )}
            {venture.location_map && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <GoogleMap location_map={venture.location_map} theme={theme} />
              </div>
            )}
            {venture.legal_compliance && venture.legal_compliance.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white pb-2 border-b-2" style={{ borderColor: theme.secondaryColor }}>
                    Legal Compliance
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venture.legal_compliance.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.key}</h3>
                        <p className="text-gray-700 dark:text-gray-200">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {venture.more_details && venture.more_details.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white pb-2 border-b-2" style={{ borderColor: theme.secondaryColor }}>
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venture.more_details.map((detail, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{detail.key}</h3>
                        <p className="text-gray-700 dark:text-gray-200">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <CTA venture={venture} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .normal-section h2 {
          color: ${theme.primaryColor};
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border-bottom: 2px solid ${theme.secondaryColor};
          padding-bottom: 0.5rem;
        }
        .normal-section button {
          background-color: ${theme.primaryColor};
          color: white;
          transition: all 0.3s ease;
        }
        .normal-section button:hover {
          background-color: ${theme.hoverColor};
        }
      `}</style>
      <ContactPopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        propertyName={venture.name}
      />
    </div>
  );
}; 