import { BiBed, BiMap, BiMapAlt, BiTab } from "react-icons/bi";
import { FaParking, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardHoverIcons from "./CardHoverIcons";
import CardLabels from "./CardLabels";
import { useState } from "react";
import ContactPopupForm from "./ContactPopupForm";

const SingleProductCard = ({
  _id,
  name,
  location,
  distance,
  purpose,
  number_of_beds,
  number_of_bathrooms,
  image,
  basis,
  parking_space,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div
        className={`flex-1 max-w-[430px] ${
          basis ? basis : "basis-[18rem]"
        } shadow-light dark:border-card-dark border rounded-lg overflow-hidden relative group bg-white dark:bg-gray-800`}
      >
        <div className="group !opacity-100 overflow-hidden relative">
          <Link to={`/venture?id=${_id}`} className="!opacity-100">
            <img
              src={image[0]}
              alt={name}
              className="w-full h-fit md:h-[250px] object-cover group-hover:scale-125 transition-a"
            />
          </Link>
          
          <div className="absolute bottom-0 left-0 w-full px-2 py-2 transition-transform bg-gradient-to-t from-black/80 sm:translate-y-10 group-hover:translate-y-0 to-transparent">
            
          </div>
        </div>
        {/*<CardLabels purpose={purpose} distance={distance} />*/}
        <div className="p-4">
        <Link to="/" className="group-hover:text-primary transition-a">
            <h1 className="text-lg font-bold capitalize">{name}</h1>
          </Link>
          {/* Basic Information Section */}
          <div className="space-y-3">
            
            
            {/* Distance */}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <BiMap className="text-primary mr-2" />
              <span>{distance}</span>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <BiBed />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{number_of_beds} Beds</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <BiTab />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{number_of_bathrooms} Baths</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <FaParking />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{parking_space} Parking</p>
              </div>
              
              
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <button 
                className="btn btn-secondary"
                onClick={() => setIsPopupOpen(true)}
              >
                Details
              </button>
              <Link
                to={`/venture?id=${_id}`}
                className="btn btn-primary flex items-center space-x-2"
              >
                <span>More Details</span>
                <FaArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ContactPopupForm 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        propertyName={name}
      />
    </>
  );
};

export default SingleProductCard;
