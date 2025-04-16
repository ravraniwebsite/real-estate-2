import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div
      className="relative z-0 flex-wrap min-h-screen gap-2 md:-mt-10 flex-center-center"
    
    >
      <div className="absolute top-0 right-0 rounded-full bg-[#04a7ff]/30 dark:bg-[#04a7ff]/50 w-72 h-72 -z-10 blur-[120px]"></div>
      <div className="flex-1 basis-[20rem]">
        <h1 className="text-4xl font-bold capitalize md:text-5xl">
        Welcome to Ravrani Developers
        <br />
        </h1>
        <div className="pl-3 mt-5 border-l-4 border-primary">
          <p>
          Discover the joy of owning land in Hyderabad’s fastest-growing locales — craft your dream home from the ground up or step into a thoughtfully built villa, ready to welcome you.
          

          </p>
        </div>
        <Link to="/property">
             <button className="mt-6 btn btn-primary">Explore Our Ventures</button>
        </Link>
        <div className="mt-6 text-center flex-align-center gap-x-6">
          <div>
            <h1 className="text-2xl font-bold">
              6 <span className="text-sm text-primary">+</span>
            </h1>
            <p>Projects Completed</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              100 <span className="text-sm text-primary">%</span>
            </h1>
            <p> customer satisfaction</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              1500 <span className="text-sm text-primary">+</span>
            </h1>
            <p>Served Clients</p>
          </div>
        </div>
      </div>



      <div className="flex-1 basis-[20rem]">
        <img src="./images2/rdlogot.png" alt="" className="w-full" />
      </div>

      
    </div>
  );
};

export default Hero;
