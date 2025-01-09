import React, { FC } from "react";

interface Hero {
  
   title: string;
    description: string;

}

const HeroSection: FC<Hero> = ({ title, description }) => {
  return (
    <div className="bg-background-blue text-white text-center py-custom-xl dark:bg-blue-900 mb-custom-xl">
    <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl font-bold mb-custom-sm">{title}</h1>
    <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl ">{description}</p>
  </div>
  );
};

export default HeroSection;
