import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiFirebase, SiTailwindcss, SiShadcnui, SiGooglegemini } from "react-icons/si";
import { Button } from "../button";

function Creator() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-gray-100">
      {/* Developer Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Developer Header */}
        <div className="relative h-40 bg-[#0077b6] flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Meet the Developer</h1>
        </div>

        {/* Developer Content */}
        <div className="flex flex-col items-center p-6 space-y-4">
          {/* Developer Image */}
          <div className="relative w-32 h-32 -mt-16 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src="/Dev.png"
              alt="Developer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Developer Name and Quote */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Ritesh Biswas</h2>
            <p className="text-lg italic text-gray-500 mt-2">"Passionate about coding and creating amazing web experiences."</p>
          </div>

          {/* Technologies Used */}
          <div className="w-full text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Technologies Used:</h3>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              {/* Frontend Technologies */}
              <div className="flex items-center">
                <FaReact className="text-3xl mr-2 text-[#61DAFB]" />
                <span className="text-lg">React</span>
              </div>
              <div className="flex items-center">
                <SiTailwindcss className="text-3xl mr-2 text-[#38B2AC]" />
                <span className="text-lg">Tailwind CSS</span>
              </div>
              <div className="flex items-center">
                <SiShadcnui className="text-3xl mr-2 text-[#FF3E00]" />
                <span className="text-lg">Shadcn</span>
              </div>
              {/* Backend Technologies */}
              <div className="flex items-center">
                <SiFirebase className="text-3xl mr-2 text-[#FFCA28]" />
                <span className="text-lg">Firebase</span>
              </div>
              <div className="flex items-center">
                <SiGooglegemini className="text-3xl mr-2 text-[#34A853]" />
                <span className="text-lg">Google's Gemini API</span>
              </div>
            </div>
          </div>

          {/* Social Media Handles */}
          <div className="flex space-x-4 mt-6">
            <a href="https://github.com/LuseBiswas" className="text-gray-700 hover:text-gray-900">
              <FaGithub className="text-3xl transition-transform duration-300 transform hover:scale-110" />
            </a>
            <a href="https://www.linkedin.com/in/ritesh-biswas-810640224/" className="text-gray-700 hover:text-gray-900">
              <FaLinkedin className="text-3xl transition-transform duration-300 transform hover:scale-110" />
            </a>
            <a href="mailto:lusebiswas@gmail.com" className="text-gray-700 hover:text-gray-900">
              <FaEnvelope className="text-3xl transition-transform duration-300 transform hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creator;
