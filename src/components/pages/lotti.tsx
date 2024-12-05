import React, { FC, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface ServiceProps {
  animationUrl: string; // URL на .lottie файл
}

const LottieComponent: FC<ServiceProps> = ({ animationUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
console.log(animationUrl)
  return (
    <div>
      {!isLoaded && <div>Loading animation...</div>}
      <Player
        src={animationUrl} // Загружаем .lottie файл
        autoplay
        loop
        style={{ height: '250px', width: '250px' }}
        onEvent={(event) => {
          if (event === 'load') {
            setIsLoaded(true);
          }
        }}
      />
    </div>
  );
};

export default LottieComponent;
