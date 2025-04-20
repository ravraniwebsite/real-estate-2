/* eslint-disable jsx-a11y/anchor-is-valid */

import { BiBuildingHouse } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-slate-200">
      <footer>
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Section - Company Info + Quick Links */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Company Info */}
              <div>
  <Link to="/" className="flex items-center gap-x-1">
    <BiBuildingHouse className="text-3xl text-primary" />
    <h1 className="hidden md:block">Ravrani Developers</h1>
  </Link>
  <p className="mt-4 text-sm text-muted">
    Premium residential plotting ventures in Hyderabad's fastest-growing locations. Buy a plot, build a custom home, or move into a ready-built villa — we make your property dreams come true.
  </p>

  <div className="gap-4 my-6 flex">
    <a
      href="https://www.facebook.com/p/Ravrani-Developers-100063754191651/"
      target="_blank"
      rel="noopener noreferrer"
      className="icon-box bg-dark-light hover:bg-hover-color-dark"
    >
      <FiFacebook />
    </a>

    <a
      href="https://twitter.com/Ravrani-Developers"
      target="_blank"
      rel="noopener noreferrer"
      className="icon-box bg-dark-light hover:bg-hover-color-dark"
    >
      <FaTwitter />
    </a>

    <a
      href="https://www.instagram.com/ravrani_developers/"
      target="_blank"
      rel="noopener noreferrer"
      className="icon-box bg-dark-light hover:bg-hover-color-dark"
    >
      <FaInstagram />
    </a>

    <a
      href="https://wa.me/919177761786?text=Hello%20i%20would%20like%20to%20know%20more%20about%20your%20ventures
"
      target="_blank"
      rel="noopener noreferrer"
      className="icon-box bg-dark-light hover:bg-hover-color-dark"
    >
      <FaWhatsapp />
    </a>
  </div>
</div>


              {/* Quick Links Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold">Ventures</h2>
                  <ul>
                    <li className="my-3 text-muted">
                      <Link to="/property">All Ventures</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Quick Links</h2>
                  <ul>
                    <li className="my-3 text-muted">
                      <Link to="/about-us">About Us</Link>
                    </li>
                    <li className="my-3 text-muted">
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li className="my-3 text-muted">
                      <Link to="/services">Services</Link>
                    </li>
                    <li className="my-3 text-muted">
                      <Link to="/faqs">Faqs</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Section - Map and Contact */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Contact & Location</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted">
                      MG96+6FH, Sanjay Nagar, Adilabad, Bhattisavargaon, Telangana 504001
                      </p>
                    </div>
                    <div>
                      <p className="text-muted">
                        <a href="tel:+91 777 61786" className="hover:text-primary">Phone: +91777 61786</a>
                      </p>
                      <p className="text-muted">
                        <a href="mailto:info@ravranidevelopers.com" className="hover:text-primary">Email: info@ravranidevelopers.com</a>
                      </p>
                    </div>
                  </div>
                </div>

               {/* Map Section */}
<div className="md:col-span-2">
  <div className="w-full h-[300px] bg-dark-light rounded-lg overflow-hidden">
    {/* Google Maps embed */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.045437828207!2d78.5086613749932!3d19.668066781662244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd25c849b0726cf%3A0xb917e53c8fc7bf2e!2sRAVRANI%20DEVELOPERS!5e0!3m2!1sen!2sin!4v1744708627130!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    ></iframe>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright Section */}
      <div className="py-2 mt-8 text-center border-t text-muted border-dark">
        <p>
          © 2025 <span className="text-primary">Ravrani Developers</span> | TS Rera
        </p>
      </div>

      <div className="py-1 mt-5 text-center">
  <p>
    Managed &amp; @ Developed By{' '}
    <a 
      href="https://www.meticsynergy.com/" 
      className="text-primary " 
      target="_blank" 
      rel="noopener noreferrer"
    >
      meticsynergy.com
    </a>{' '}
    | Digital marketing agency
  </p>
</div>

    </div>
  );
};

export default Footer;
