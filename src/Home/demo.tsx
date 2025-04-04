import React from "react";
import { ContainerScroll } from "./contianer-scroll-animation.tsx"; // Adjust path if necessary
import BeamsBackground from "./beams-bg.tsx";
import { AuroraText}  from "./arora-text.tsx";
import DevToolButton from "./devtool.js";

export function HeroScrollDemo() {
    
    
  return (
    <div className="flex flex-col items-center">
      {/* Background Effect */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        
        <ContainerScroll
          titleComponent={
            <h1 className="text-center text-gray-900 dark:text-white">
      {/* Button placed above the heading text */}
      <div className="mb-4 flex justify-center">
        <DevToolButton />
      </div>

      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Introducing.<br />
        <span className="text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold mt-1 leading-none block">
  <span className="bg-clip-text text-gray-800">Tall</span>
  <span className="bg-clip-text text-indigo-500">Ai</span>
</span>

      </div>
    </h1>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
