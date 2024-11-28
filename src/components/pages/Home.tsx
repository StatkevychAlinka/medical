import React, { FC } from "react";
import Image from "next/image";
interface ServiceProps {
  
  homebuttonstaralt:string;
  homebuttonstarurl:string;
  homedecorationsalt:string;
  homedecorationurl:string;
  hometitle:string;
  homedescription:string;
  homebuttontext:string;
  
  homeimage:string;
  homeimagetitle:string;

  post:string;
}
const Home: FC<ServiceProps> = ({post ,  homeimage,homeimagetitle,  homedescription,homedecorationsalt,
  homedecorationurl,homebuttonstaralt, homebuttonstarurl,hometitle,homebuttontext}) => {
	return (
		<>
		<section id="home" className=" relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45">
    
  <div className="mx-auto max-w-7xl">
    <div className="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden">
      {/* Hero Circles */}
      {[1282, 1046].map((size, index) => (
        <div
          key={index}
          className={`-u-z-10 hero-circle-gradient absolute -top-[${size === 1282 ? '128%' : '112%'}] left-1/2 -z-1 h-[${size}px] w-full max-w-[${size}px] -translate-x-1/2 rounded-full sm:top-[${size === 1282 ? '-107%' : '-93%'}] xl:top-[${size === 1282 ? '-73%' : '-62%'}]`}
        ></div>
      ))}
      {/* Background and Bur */}
      <div className="-z-10 absolute left-1/2 top-0 aspect-[1204/394] w-full max-w-[1204px] -translate-x-1/2">
  <span
    className="absolute left-1/2 top-[-80%] h-[656px] w-[656px] -translate-x-1/2 rounded-full bg-[#2c1158] opacity-22 blur-[137px]"
  ></span>
</div>

<div className="-z-10 absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
  <span
    className="absolute left-1/2 top-[-60%] h-[1282px] w-[1282px] -translate-x-1/2 rounded-full bg-[#8646F4] opacity-25 blur-[250px]"
  ></span>
</div>

    </div>
  </div>

  {/* Content */}
  <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
    <div className="text-center">
      {/* Subtitle */}
      <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
        <Image
          className="max-w-none"
          loading="lazy"
          width={15}
          height={15}
          style={{
            color: 'transparent',
          }}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          src={ homebuttonstarurl}
          alt={homebuttonstaralt}
        />
        <span className="hero-subtitle-text">{homebuttonstaralt}</span>
      </span>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1 min-h-36">
       {hometitle}
      </h1>

      {/* Description */}
      <p className="mx-auto mb-9 max-w-[500px] font-medium md:text-lg">
       { homedescription}
      </p>
         {/* Button */}

  
       
<button className="button">
  <span className="liquid"></span>  
  <span className="btn-txt">{homebuttontext}</span>
</button>


   
     
       
    
    </div>
  </div>

  {/* Hero Image */}
  <div className="relative mx-auto mt-17 aspect-[1170/411] w-full max-w-[1170px] min-h-10" data-wow-delay="0.1s">
    
  </div>
</section>


		</>
	);
};
export default Home;