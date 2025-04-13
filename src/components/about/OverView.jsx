import { BiPlay } from "react-icons/bi";

const OverView = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 basis-[18rem]">
          <h1 className="heading">What We Do</h1>
          <p className="mt-3">
            At Ravrani Developers, we specialize in creating well-planned residential plots and homes across
            Hyderabad's most promising locations. With over a decade of experience, we ensure every plot we offer
            is 100% Vaastu-compliant, legally secured, and ready for your dream home or investment. We combine 
            the best of modern design with thoughtful planning to give you the best possible living experience.
          </p>
          
            <ul className="mt-2 list-disc pl-5 ">
              <li>10+ years of experience in real estate development</li>
              <li>500+ successfully completed projects</li>
              <li>20+ strategically located ventures in Hyderabad</li>
              <li>Vaastu-compliant and RERA-approved plots</li>
            </ul>
         
        </div>

        <div className="flex-1 basis-[18rem]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="/images/property (41).png"
              alt="Overview"
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute top-0 left-0 flex-col w-full h-full bg-black/50 flex-center-center">
              <div className="icon-box !text-primary !bg-transparent border !border-primary relative before:absolute before:w-full before:h-full before:rounded-full before:animate-ping before:bg-primary/60">
                <BiPlay className="text-2xl" />
              </div>
              <h1 className="mt-3 text-3xl font-semibold text-white capitalize">
                Watch the Overview
              </h1>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default OverView;
