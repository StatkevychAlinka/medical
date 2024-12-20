import React, { useState, FC } from "react";

interface AccordionProps {
  items: { title: string; content: string;  whu_use:string; }[];
}

const Accordion: FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="space-y-4 w-full mt-10">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-md overflow-hidden"
        >
          <button
            onClick={() => handleToggle(index)}
            className="flex justify-between items-center w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
          >
            <h3 className="text-lg font-medium  text-left">{item.title}</h3>
         
              <span
                className={`text-xl font-bold transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
           
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="px-4 py-3 bg-[#7f6aaf]">
              <p className="text-white text-left">{item.content}</p>
              <p className="text-white text-left pt-3"><strong>Cine folosește::</strong><span>{item.whu_use}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
