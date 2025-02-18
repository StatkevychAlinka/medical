import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LottieProps {
  animationUrl: string; // URL на файл .lottie
}

const LottieComponent: React.FC<LottieProps> = ({ animationUrl }) => {
  return (
    <div>
      <Player
        src={animationUrl} // Используем URL из Contentful
        autoplay
        loop
        style={{ height: '100px', width: '100px' }}
      />
    </div>
  );
};

export default LottieComponent;
