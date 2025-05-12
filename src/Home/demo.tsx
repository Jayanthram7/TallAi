import React from "react";
import { ContainerScroll } from "./contianer-scroll-animation.tsx"; // Adjust path if necessary
import BeamsBackground from "./beams-bg.tsx";
import { AuroraText}  from "./arora-text.tsx";
import DevToolButton from "./devtool.js";

export function HeroScrollDemo() {
    
    
  return (
    <div className="flex flex-col items-center">
      {/* Background Effect */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 text-center mt-24">
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
        Introducing.<br />
        <span className="text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold mt-1 leading-none block">
  <span className="bg-clip-text text-gray-800">Advent</span>
  <span className="bg-clip-text text-indigo-500">Ai</span>
</span>

      </div>
        
        
        
      </div>
    </div>
  );
}

export default HeroScrollDemo;
