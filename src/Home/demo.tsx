import React from "react";
import { ContainerScroll } from "./contianer-scroll-animation.tsx"; // Adjust path if necessary
import BeamsBackground from "./beams-bg.tsx";

export function HeroScrollDemo() {
  return (
    <div className="flex-col">
      {/* Background Effect */}
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <h1 className="text-4xl font-semibold text-white dark:text-white">
              Introducing.<br />
              <span className="text-[10rem] font-bold mt-1 leading-none">
                TallAi
              </span>
            </h1>
          }
        >
          <img
            src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}

export default HeroScrollDemo;