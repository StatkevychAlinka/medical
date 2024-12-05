import React, { FC } from 'react';
import Lottie from 'react-lottie';


interface ServiceProps {
  animationData: object;
}

const LottieComponent: FC<ServiceProps> = ({ animationData }) => {


  const defaultOptions = {
    loop: true,
    
    animationData,

  };

  return (
    <>
   <Lottie options={defaultOptions} height={100} width={100} />
    </>
  );
};

export default LottieComponent;
