import { BiBed, BiMap, BiMapAlt, BiTab } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardHoverIcons from "./CardHoverIcons";
import CardLabels from "./CardLabels";
import { useState } from "react";
import ContactPopupForm from "./ContactPopupForm";
import { MdHolidayVillage } from "react-icons/md";
import { GiPlot } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { MdMap } from "react-icons/md"; // map-style icon

const SingleProductCardFullWidth = ({
  _id,
  name,
  location,
  price,
  distance,
  purpose,
  number_of_beds,
  number_of_bathrooms,
  dimensions,
  image,
  description,
  textLength,
  showLabels,
  parking_space,
  banner_image,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="relative grid grid-cols-1 gap-3 mt-3 overflow-hidden border rounded-lg shadow-light sm:grid-cols-3 md:grid-cols-4 dark:border-card-dark group">
        <div className="sm:col-span-1">
          <div className="group !opacity-100 overflow-hidden relative h-full">
            <Link to={`/venture?id=${_id}`} className="!opacity-100">
              <img
                src={banner_image || image[0]}
                alt={name}
                className="object-cover w-full h-full group-hover:scale-125 transition-a"
              />
            </Link>
            <CardHoverIcons />
          </div>
          {!showLabels && <CardLabels purpose={purpose} distance={distance} />}
        </div>
        <div className="sm:col-span-2 md:col-span-3">
          <div className="p-3">
            <Link to="/" className="group-hover:text-primary transition-a">
              <h1 className="text-lg font-bold capitalize">{name}</h1>
            </Link>

            <div className="mt-2 flex-align-center gap-x-2">
              <BiMap />
              <p>{distance}</p>
            </div>
            <p className="mt-2">{`${description.slice(
              0,
              textLength || 180
            )}...`}</p>
            <div className="flex justify-between mt-3">
              <div className="flex-align-center gap-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <MdMap />
                </div>
                <p className="text-sm">Plot's
                </p>
              </div>
              <div className="flex-align-center gap-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <FaHome />
                </div>
                <p className="text-sm"> 2BHK/3BHK
                </p>
              </div>
              <div className="flex-align-center gap-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <MdHolidayVillage />
                </div>
                <p className="text-sm"> DUPLEX VILLAS
                </p>
              </div>
            </div>

            <div className="mt-4 flex-center-between">
              <Link
                to={`/venture?id=${_id}`}
                className="btn btn-primary flex items-center space-x-2"
              >
                <span>More Details</span>
                <FaArrowRight size={14} />
              </Link>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsPopupOpen(true)}
              >
                Details
              </button>
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

export default SingleProductCardFullWidth;
