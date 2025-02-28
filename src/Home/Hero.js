'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom"; // Import Link from React Router

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-100">
      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-52 lg:py-40">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-400 ring-1 ring-gray-700 hover:ring-gray-500">
              Harness the potential of Ai for your data.{' '}
              <a href="#" className="font-semibold text-indigo-400">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            </div>
            
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-100 ">
              Introducing
            </h1>
            
            <div className="relative group">
  <h1 className="text-8xl font-semibold tracking-tight text-gray-100 sm:text-9xl relative z-10">
    TallAi.
  </h1>
  
  {/* Aurora Effect */}
  <div
    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-3xl opacity-50
      group-hover:opacity-100 transition duration-500 group-hover:scale-125"
  ></div>
</div>

            <h1 className="text-2xl mt-16 py-1 font-semibold  tracking-tight text-gray-100 ">
            Your Business, Powered by AI Innovation.
            </h1>
            <p className=" mt-1 text-base font-extralight text-gray-300 sm:text-lg">
            Leverage insights from your data with AI, NLP, and ML. Transform information into actionable intelligence and drive smarter decisions like never before.            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md mt-2 bg-indigo-600 px-4 py-3 text-medium font-semibold text-white shadow-sm hover:bg-white hover:text-indigo-500 transition transition-ease-in-out delay-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View Features
              </a>
              <a href="#" className="text-medium mt-2 hover:text-white font-semibold text-gray-400">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
            
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
