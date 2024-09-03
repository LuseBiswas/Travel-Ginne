import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import Banner from '../../../assets/Plan2.jpeg';

function Hero() {
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-extrabold text-4xl lg:text-[42px] text-center mt-16">
          <span className="text-[#0077b6]">Your AI Travel Genie:</span> Perfect, Seamless & Effortless
        </h1>
        <p className="lg:text-3xl text-gray-500 text-center">
          Plan your Unforgettable Journeys
        </p>

        {/* Link to Navigate through a Button to another Page */}
        <Link to={'/create-trip'}>
          <Button>Get Started</Button>
        </Link>
      </div>

      {/* Full-Width Banner Image Section */}
      <div className="relative w-full h-[400px] lg:h-[500px] mt-20">
        <img 
          src={Banner} 
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
        {/* Optional Overlay Text Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <h1 className="font-extrabold text-4xl lg:text-[42px] text-center">
            <span className="text-8xl">What's your next plan <span className="text-[#0077b6] " >?</span></span>
            
          </h1>
         
        </div>
      </div>
    </>
  );
}

export default Hero;
