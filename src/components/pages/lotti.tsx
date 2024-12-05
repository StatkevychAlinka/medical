import React, { FC, useEffect, useState } from 'react';
import Lottie from 'react-lottie';

interface ServiceProps {
  animationUrl: string; // URL на .lottie файл
}

const LottieComponent: FC<ServiceProps> = ({ animationUrl }) => {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(animationUrl);
        const data = await response.json(); // Загружаем содержимое .lottie файла
        setAnimationData(data);
      } catch (error) {
        console.error('Ошибка при загрузке Lottie:', error);
      }
    };

    fetchAnimationData();
  }, [animationUrl]);

  if (!animationData) {
    return <div>Loading animation...</div>; // Показываем заглушку пока анимация загружается
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData, // Анимация загружается динамически
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default LottieComponent;
