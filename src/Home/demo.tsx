import React from "react";
import { ContainerScroll } from "./contianer-scroll-animation.tsx"; // Adjust path if necessary
import BeamsBackground from "./beams-bg.tsx";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col items-center">
      {/* Background Effect */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 mt-6 sm:mt-10">
        <ContainerScroll
          titleComponent={
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white dark:text-white text-center">
              Introducing.<br />
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold mt-1 leading-none block">
                TallAi
              </span>
            </h1>
          }
        >
          <img
            src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75"
            alt="hero"
            height={480}
            width={800}
            className="w-full h-full   mx-auto rounded-xl object-cover object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}

export default HeroScrollDemo;
