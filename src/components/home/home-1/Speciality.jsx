import { FiCheck, FiLayers, FiUsers } from "react-icons/fi";

const Speciality = () => {
  return (
    <div className="pt-10 pb-16">
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 basis-[20rem]">
          <h1 className="sub-heading">about us</h1>
          <h1 className="heading">Why Choose Ravrani Developers?</h1>
          <p className="mt-3">
          Your safety, satisfaction, and investment are our top priorities.
Every project is fully approved, Vaastu-compliant, and legally secure.
Live in beautifully planned, gated communities with all essentials.
Choose Ravrani — where quality meets commitment.
          </p>
          <div className="mt-4">
            <div className="flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>HMDA / DTCP / RERA approved projects</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>100% Vaastu-compliant plots</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Gated layouts with 24/7 security and CCTV</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Located in growth hotspots near ORR, RRR, Pharma City</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Underground electricity and drainage</p>
            </div>
            
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Avenue plantations and landscaping</p>
            </div>
            
            <button className="mt-4 btn btn-primary">read more</button>
          </div>
        </div>
        <div className="flex-1 basis-[20rem]">
          <div className="relative">
            <img
              src="/images/property (5).jpg"
              alt=""
              className="rounded-lg w-full sm:h-[400px] object-cover"
            />
            <div className="absolute -bottom-10 sm:bottom-5 -left-2 md:-left-20">
              <div className="p-3 bg-white rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
                <h1>Affordable pricing with friendly customer service</h1>
                <div className="icon-box text-primary !bg-primary/20">
                  <FiUsers />
                </div>
              </div>
              <div className="p-3 mt-4 ml-8 bg-white rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
                <h1>
                  Working with the symbol and reputation of trustworthy trait
                </h1>
                <div className="icon-box text-primary !bg-primary/20">
                  <FiLayers />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speciality;
