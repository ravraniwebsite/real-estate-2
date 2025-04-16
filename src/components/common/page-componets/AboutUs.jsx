import { BiCreditCard, BiGlobe, BiHomeAlt } from "react-icons/bi";

const AboutUs = () => {
  return (
    <div className="pt-16 pb-20">
      <div className="flex flex-wrap gap-24">
        <div className="relative flex-1 basis-[18rem] border">
          <img
            src="/images/property (16).jpg"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <img
            src="/images2/aboutus2.png"
            alt=""
            className="absolute object-cover w-48 h-64 border-4 border-white rounded-lg sm:w-72 sm:h-80 dark:border-dark -bottom-20 -right-2 md:-right-20"
          />
        </div>
        <div className="relative flex-1 basis-[22rem]">
          <h1 className="sub-heading">about us</h1>
          <h1 className="heading">custom homes for modern living</h1>
          <p className="mt-3">
            At Ravrani Developers, we help you shape the home you’ve always dreamed of—whether it’s a cozy 2BHK, a spacious 3BHK villa, or a fully custom-designed residence. Our floor plans are tailored to meet your lifestyle, budget, and long-term goals.
          </p>
          <div className="mt-4">
            <div className="flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiHomeAlt />
              </div>
              <div>
                <h1 className="font-semibold capitalize">2BHK / 3BHK / Duplex</h1>
                <p>
                  Compact & spacious plans  
                  <br />Private gardens & balconies  
                  <br />Ideal for families & working couples
                </p>
              </div>
            </div>

            <div className="mt-3 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiGlobe />
              </div>
              <div>
                <h1 className="font-semibold capitalize">modern construction standards</h1>
                <p>
                  RCC framed structure  
                  <br />Vitrified tile flooring  
                  <br />Vaastu-compliant layouts
                </p>
              </div>
            </div>

            <div className="mt-3 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiCreditCard />
              </div>
              <div>
                <h1 className="font-semibold capitalize">total payment transparency</h1>
                <p>
                  Bank loan assistance  
                  <br />Flexible EMI options  
                  <br />Clear title & spot registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
