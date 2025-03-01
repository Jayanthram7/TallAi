'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRight, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom";
import Demo from "./demo.tsx";

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
  },
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
    <div
      className="pointer-events-none absolute size-full overflow-hidden [perspective:200px] opacity-[var(--opacity)]"
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black" />
    </div>
  );
};

export default function Hero() {
  return (
    <div className="bg-gray-950 text-gray-100 ">
      

      {/* Main Hero Section */}
      <div className="relative isolate px-6 lg:px-8">
      <Demo/>
        <div className="mx-auto max-w-2xl py-32 sm:py-52 lg:py-50 text-center">
          <h1 className="text-4xl font-semibold">Introducing</h1>
          <div className="relative group">
            <h1 className="text-8xl font-semibold tracking-tight text-gray-100 sm:text-9xl relative z-10">
              TallAi.
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-3xl opacity-50 group-hover:opacity-100 transition duration-500 group-hover:scale-125"></div>
          </div>
          <h2 className="text-2xl mt-16 py-1 font-semibold">
            Your Business, Powered by AI Innovation.
          </h2>
          <p className="mt-1 text-base font-extralight text-gray-300 sm:text-lg">
            Leverage insights from your data with AI, NLP, and ML. Transform information into actionable intelligence.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-4 py-3 text-medium font-semibold text-white shadow-sm hover:bg-white hover:text-indigo-500 transition"
            >
              View Features
            </a>
            <a
              href="#"
              className="text-medium hover:text-white font-semibold text-gray-400"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative isolate px-8 lg:px-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold">Trusted by users worldwide</h1>
          <p className="text-lg text-gray-400 mt-4">
            Join thousands who are building the future with our platform.
          </p>
        </section>

        <div className="relative flex w-full flex-col mt-12 items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="relative bg-gray-900 text-white rounded-xl p-6 w-[420px] mx-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className="text-lg font-semibold">
                          {testimonial.author.name}
                        </h3>
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-400">
                        {testimonial.author.handle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-300">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-black sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-black sm:block" />
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-100 px-8 py-12 mt-12">
      <div className="mx-auto max-w-9xl">
        {/* Top row: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-bold">Stay Connected</h2>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col space-y-2">
            <span className="text-lg font-semibold">Home</span>
            <span className="text-lg font-semibold">About Us</span>
            <span className="text-lg font-semibold">Services</span>
            <span className="text-lg font-semibold">Products</span>
            <span className="text-lg font-semibold">Contact</span>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center space-x-6">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© TallAi. All rights reserved.</p>
          <p>
            Made with <span className="text-red-500">❤️</span> in India by Jayanth18
          </p>
        </div>
      </div>
    </footer>
  );
}
