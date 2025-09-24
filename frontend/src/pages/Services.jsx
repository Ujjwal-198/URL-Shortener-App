import React from "react";

const Services = () => {
  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg"></div>

      <div className="relative container mx-auto px-6 lg:px-12 text-gray-50">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-wide">
          Our Services
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-16 leading-relaxed text-gray-200">
          At <span className="font-semibold text-white">Short URL</span>, 
          we go beyond just shortening links. Our platform provides tools to 
          simplify sharing, improve security, and offer insights into link performance.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">URL Shortening</h2>
            <p className="text-gray-200 leading-relaxed">
              Instantly convert long URLs into clean, short links that are easy to share across platforms. Perfect for emails, social media, and campaigns.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">Link Analytics</h2>
            <p className="text-gray-200 leading-relaxed">
              Gain insights into your links with real-time analytics. Track clicks, traffic sources, and usage patterns to understand your audience.
            </p>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">Custom Short Links</h2>
            <p className="text-gray-200 leading-relaxed">
              Personalize shortened links with custom IDs or branded slugs to make them memorable and boost trust among your audience.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">Secure Links</h2>
            <p className="text-gray-200 leading-relaxed">
              Every link you generate is safe and protected from malicious redirections. Security is always a top priority.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">Link Management</h2>
            <p className="text-gray-200 leading-relaxed">
              Organize and manage all your links in one place. Edit, disable, or update URLs with a simple dashboard interface.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">Free & Easy to Use</h2>
            <p className="text-gray-200 leading-relaxed">
              Our platform is free, fast, and user-friendly. You don’t need technical expertise to start shortening and managing links effectively.
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-center leading-relaxed text-gray-200">
          Whether you’re an individual looking to share links easily 
          or a business tracking marketing campaigns, 
          <span className="font-semibold text-white"> Short URL </span>
          provides everything you need to simplify and optimize link sharing.
        </p>
      </div>
    </div>
  );
};

export default Services;
