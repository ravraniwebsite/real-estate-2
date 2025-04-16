const Stats = () => {
  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="heading">
          Welcome to Ravrani Developers <br /> Building a Future You Can Trust
        </h1>
        <p className="mt-4">
          At Ravrani Developers, we specialize in premium residential plotting ventures across Hyderabad's 
          fastest-growing locations. With a strong commitment to quality, transparency, and legal security, 
          we provide well-planned layouts that are ideal for building homes or long-term investments. Whether 
          you're buying a plot, constructing a custom-designed house, or moving into a ready-built villa — we're 
          here to make your property dreams come true.
        </p>
      </div>
      <div className="flex flex-wrap gap-24 mt-8">
        <div className="relative flex-1 basis-[18rem]">
          <img
            src="/images2/rdlogot - Copy.png"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute w-4/5 p-3 -translate-x-1/2 border-4 border-white rounded-lg -bottom-10 left-1/2 dark:border-main-dark bg-secondary text-slate-200">
            <div className="gap-5 flex-center-between">
              <h1 className="font-semibold">
                Join Our Leading Property Venture
              </h1>

              <div>
                <h1 className="text-2xl font-bold text-primary">1500+</h1>
                <p>People Joined</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1 basis-[22rem]">
          <p>
            Whether you're purchasing land to build a custom home or opting for one of our high-quality 
            pre-built homes, we provide all the tools and support necessary for a smooth, secure, and 
            successful transaction. Our flexible payment options, trusted financial partners, and spot 
            registration services make the process easy and efficient.
          </p>
          <p className="mt-3">
            We also offer personalized architectural services, allowing you to design a home that fits 
            your unique style and needs. With Ravrani Developers, you're not just buying property; you're 
            making an investment in your future.
          </p>
          <div className="mt-3">
            <div className="mt-2">
              <div className="flex-center-between">
                <h1 className="font-semibold capitalize">investment plan</h1>
                <h1 className="font-semibold capitalize">80%</h1>
              </div>
              <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-light">
                <div className="w-4/5 h-full rounded-full bg-secondary"></div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex-center-between">
                <h1 className="font-semibold capitalize">
                  consulting experience
                </h1>
                <h1 className="font-semibold capitalize">70%</h1>
              </div>
              <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-light">
                <div className="w-[70%] h-full bg-secondary rounded-full"></div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex-center-between">
                <h1 className="font-semibold capitalize">planning</h1>
                <h1 className="font-semibold capitalize">90%</h1>
              </div>
              <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-light">
                <div className="w-[90%] h-full bg-secondary rounded-full"></div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex-center-between">
                <h1 className="font-semibold capitalize">grow business</h1>
                <h1 className="font-semibold capitalize">85%</h1>
              </div>
              <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-light">
                <div className="w-[85%] h-full bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
