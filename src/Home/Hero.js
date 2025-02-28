'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
    href: "https://twitter.com/emmaai"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
    href: "https://twitter.com/davidtech"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
  }
];

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  };

  return (
    <div className="pointer-events-none absolute size-full overflow-hidden [perspective:200px] opacity-[var(--opacity)]" style={gridStyles}>
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black" />
    </div>
  );
};

export default function Hero() {
  return (
    <div className="bg-gray-900 text-gray-100 relative">
      <RetroGrid />
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-52 lg:py-50 text-center">
          <h1 className="text-4xl font-semibold">Introducing</h1>
          <div className="relative group">
            <h1 className="text-8xl font-semibold tracking-tight text-gray-100 sm:text-9xl relative z-10">TallAi.</h1>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-3xl opacity-50 group-hover:opacity-100 transition duration-500 group-hover:scale-125"></div>
          </div>
          <h2 className="text-2xl mt-16 py-1 font-semibold">Your Business, Powered by AI Innovation.</h2>
          <p className="mt-1 text-base font-extralight text-gray-300 sm:text-lg">
            Leverage insights from your data with AI, NLP, and ML. Transform information into actionable intelligence.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-indigo-600 px-4 py-3 text-medium font-semibold text-white shadow-sm hover:bg-white hover:text-indigo-500 transition">View Features</a>
            <a href="#" className="text-medium hover:text-white font-semibold text-gray-400">Learn more →</a>
          </div>
        </div>
      </div>

      <div className="relative isolate px-8 lg:px-12">
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold">Trusted by users worldwide</h1>
          <p className="text-lg text-gray-400 mt-4">Join thousands who are building the future with our platform.</p>
        </section>

        <div className="relative flex w-full overflow-hidden p-4">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-gray-800 text-white rounded-xl p-6 mx-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white opacity-10 w-full h-24 rounded-t-xl" />
                <img src={testimonial.author.avatar} alt={testimonial.author.name} className="w-16 h-16 rounded-full mx-auto" />
                <h3 className="mt-4 text-lg font-semibold">{testimonial.author.name}</h3>
                <p className="text-sm text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}