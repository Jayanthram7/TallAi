import React from "react";

export default function DevToolButton() {
  return (
    <button
      className="
        inline-flex items-center gap-2 
        rounded-full border border-gray-200
        bg-white px-4 py-2 
        text-sm font-medium text-gray-700
        hover:bg-gray-50 
        transition-colors duration-150
      "
    >
      {/* Confetti Emoji */}
      <span className="text-base">🎉</span>
      
      {/* Vertical Separator */}
      <span className="w-px h-4 bg-gray-200" />
      
      {/* Button Text */}
      <span>Leverage the power of AI - for your bussiness</span>
      
      {/* Right Arrow (Heroicons “Chevron Right”) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
