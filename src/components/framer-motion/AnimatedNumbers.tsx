import React, { FC, useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import scss from "./Animation.module.scss";

interface AnimatedNumbersProps {
  value: number;
}

const AnimatedNumbers: FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 7000 });
  const isView = useInView(ref);

  useEffect(() => {
    if (isView) {
      motionValue.set(value);
    }
  }, [isView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest: number) => {
      if (ref.current) {
        // Округляем значение до целого числа или до нужного количества знаков
        ref.current.textContent = latest >= value ? value.toString() : latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return (
    <>
      <span ref={ref} className={scss.numberContainer}></span>
    </>
  );
};

export default AnimatedNumbers;

