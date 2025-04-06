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

export const MedianTemplate = ({ venture, theme }) => {
  return (
    <div className="space-y-6 bg-gray-50">
      <Hero venture={venture} theme={theme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Testimonials Section */}
            {/* {venture.testimonials && venture.testimonials.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-8 relative pb-2">
                    Client Testimonials
                    <span className="absolute bottom-0 left-0 w-24 h-1" style={{ backgroundColor: theme.primaryColor }}></span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="text-xl italic leading-relaxed text-gray-700">
                        "{venture.testimonials[0].text}"
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: theme.primaryColor }}>
                          <img 
                            src={venture.testimonials[0].avatar || '/default-avatar.png'} 
                            alt={venture.testimonials[0].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{venture.testimonials[0].name}</div>
                          <div className="text-gray-600 text-sm">{venture.testimonials[0].designation}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {venture.testimonials[0].keywords?.map((keyword, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border"
                            style={{ borderColor: theme.primaryColor }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md" style={{ paddingTop: '56.25%' }}>
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

            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
              <Overview venture={venture} theme={theme} />
            </div>
            {venture.features && venture.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <Amenities features={venture.features} theme={theme} />
              </div>
            )}
            {venture.layouts && venture.layouts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <Layouts layouts={venture.layouts} theme={theme} />
              </div>
            )}
            {venture.image && venture.image.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <ImageSection image={venture.image} theme={theme} />
              </div>
            )}
            {venture.video && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <YoutubeEmbedVideo video2={venture.video} theme={theme} />
              </div>
            )}
            {venture.location_map && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <GoogleMap location_map={venture.location_map} theme={theme} />
              </div>
            )}
            {venture.legal_compliance && venture.legal_compliance.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <LegalCompilance legal_compliance={venture.legal_compliance} theme={theme} />
              </div>
            )}
            {venture.more_details && venture.more_details.length > 0 && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <MoreDetails more_details={venture.more_details} theme={theme} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
                <CTA theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .median-section h2 {
          color: ${theme.primaryColor};
          font-size: 1.75rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .median-section h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: ${theme.primaryColor};
        }
      `}</style>
    </div>
  );
}; 