import React from "react";

const About = () => {
  return (
    <div className="relative min-h-screen py-16">
      
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg"></div>

      <div className="relative container mx-auto px-6 lg:px-10">

        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-100 mb-10 tracking-wide">
          About Us
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          Welcome to <span className="font-semibold text-white">Short URL</span>, 
          your simple and efficient solution for turning long, complicated links into short, 
          easy-to-share URLs. Whether you’re a student, professional, or business, 
          our goal is to make link management effortless and reliable.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-700 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-200 leading-relaxed">
              Our mission is to simplify the way people share information online. 
              Long URLs can be messy and unmanageable, so we provide a tool that 
              shortens them instantly while offering insights and tracking features. 
              Our aim is to save time and enhance productivity.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-700 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed">
              We envision a digital world where sharing information is seamless and organized. 
              By combining simplicity with smart analytics, we aim to build a platform that 
              empowers individuals and businesses to understand their audience better.
            </p>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 text-center border border-gray-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">Simplicity</h3>
            <p className="text-gray-200 leading-relaxed">
              Shorten links in one click with an intuitive interface designed for everyone.
            </p>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 text-center border border-gray-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">Analytics</h3>
            <p className="text-gray-200 leading-relaxed">
              Track link clicks and gain insights into your audience for better decision-making.
            </p>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 text-center border border-gray-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">Security</h3>
            <p className="text-gray-200 leading-relaxed">
              Your data and links are protected with modern security practices.
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto text-center leading-relaxed">
          At <span className="font-semibold text-white">Short URL</span>, 
          we’re more than just a URL shortener. We help you share smarter, 
          track better, and connect faster.
        </p>

      </div>
    </div>
  );
};

export default About;
