import React, { FC } from 'react';
import Lottie from 'react-lottie';
import { useInView } from 'react-intersection-observer';

interface ServiceProps {
  animationData: object;
}

const LottieComponent: FC<ServiceProps> = ({ animationData }) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Процент видимости элемента на экране
    triggerOnce: true, // Анимация запускается один раз
  });

  const defaultOptions = {
    loop: true,
    autoplay: inView, // Запускаем только если элемент видим
    animationData,

  };

  return (
    <div ref={ref}>
      {inView && <Lottie options={defaultOptions} height={100} width={100} />}
    </div>
  );
};

export default LottieComponent;
