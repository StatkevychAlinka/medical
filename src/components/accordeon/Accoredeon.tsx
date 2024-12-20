import React, { FC } from "react";

interface AccordionProps {
  items: { title: string; content: string; whu_use: string }[];
}

const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <div className="space-y-4 w-full mt-10">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-md overflow-hidden"
        >
          {/* Используем input[type="checkbox"] для управления */}
          <input
            type="checkbox"
            id={`accordion-checkbox-${index}`}
            className="hidden peer"
          />
          <label
            htmlFor={`accordion-checkbox-${index}`}
            className="flex justify-between items-center w-full cursor-pointer rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none peer-checked:border-purple"
          >
            <h3 className="text-lg font-medium text-left">{item.title}</h3>
            <span
              className="text-xl font-bold transform transition-transform duration-300 peer-checked:rotate-45"
            >
              +
            </span>
          </label>
          {/* Содержимое аккордеона */}
          <div
            className="overflow-hidden max-h-0 transition-all duration-300 peer-checked:max-h-screen bg-[#7f6aaf]"
          >
            <div className="px-4 py-3">
              <p className="text-white text-left">{item.content}</p>
              <p className="text-white text-left pt-3">
                <strong>Cine folosește:</strong> <span>{item.whu_use}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
