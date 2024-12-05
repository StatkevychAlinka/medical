import React, { FC } from 'react'; // Импорт React и FC
import Lottie from 'react-lottie'; // Импорт библиотеки Lottie


interface ServiceProps {
  animationData: object; // Тип данных для JSON-анимации
}

const LottieComponent: FC<ServiceProps> = ({ animationData }) => {
  const defaultOptions = {
    loop: true, // Зацикливать анимацию
    autoplay: true, // Автозапуск анимации
    animationData, // Данные анимации из JSON файла
   
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default LottieComponent;
