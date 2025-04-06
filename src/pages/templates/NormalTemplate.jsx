import React from 'react';
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

export const NormalTemplate = ({ venture, theme }) => {
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
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <Layouts layouts={venture.layouts} theme={theme} />
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
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <LegalCompilance legal_compliance={venture.legal_compliance} theme={theme} />
              </div>
            )}
            {venture.more_details && venture.more_details.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <MoreDetails more_details={venture.more_details} theme={theme} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <CTA theme={theme} />
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
    </div>
  );
}; 