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
      <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1 min-h-10">
       {hometitle}
      </h1>

   
         {/* Button */}

  
       
<button className="button">
  <span className="liquid"></span>  
  <span className="btn-txt">{homebuttontext}</span>
</button>


   
     
       
    
    </div>
  </div>

  {/* Hero Image */}
  <div className="relative mx-auto mt-17 aspect-[1170/411] w-full max-w-[1170px] px-3 " data-wow-delay="0.1s">


<div className="cards mb-3">
    <div className="card-1">
    </div>
    <div className="right">
            <div className="card-2">
            </div>
            <div className="card-3">
            </div>
            <div className="card-3">
            </div>
            <div className="card-3">
            </div>
            <div className="card-3">
        </div>
        <div className="bottom">
            <div className="card-4">
            </div>
            <div className="card-4">
            </div>
            <div className="card-4">
            </div>
        </div>
    </div>
</div>
<div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent "></div>

{/*<div className="relative bg-[#030014] w-full h-[411px]">
 
  <div className="absolute top-[277px] left-0 w-full h-[123px] bg-[#030014]"></div>
  
  
  <div className="relative mx-auto w-[970px] h-[393px] rounded-[20px] bg-gradient-to-b from-white/3 to-transparent border border-white/8">
 
    <div className="absolute inset-[10px] rounded-[12px] bg-gradient-to-b from-white/4 to-transparent border border-white/12"></div>
    
  
    <div className="absolute top-[10px] left-[310px] h-[381px] border-l border-white/12"></div>
    
    
    <div className="absolute top-[36px] left-[134px] flex space-x-4">
      <div className="w-4 h-4 rounded-full bg-white/20"></div>
      <div className="w-4 h-4 rounded-full bg-white/20"></div>
      <div className="w-4 h-4 rounded-full bg-white/20"></div>
    </div>
    
   
    <div className="absolute top-[84px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/10"></div>
    <div className="absolute top-[126px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/30"></div>
    <div className="absolute top-[168px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/6"></div>
    <div className="absolute top-[210px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/4"></div>
    <div className="absolute top-[252px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/2"></div>
    <div className="absolute top-[294px] left-[130px] w-full h-[30px] rounded-[8px] bg-white/1"></div>
    
   
    
  </div>
  
  
  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
</div>*/}

  </div>
</section>


		</>
	);
};
export default Home;