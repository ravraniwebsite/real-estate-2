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
              src="/images2/aboutus3.png"
              alt="Overview"
              className="w-full h-[300px] object-cover"
            />
           
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default OverView;
