import React, { useEffect, useState } from "react";

const FirstTimePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    
    const popupShown = sessionStorage.getItem("popupShown");

    if (!popupShown) {
      setShowPopup(true); 
      sessionStorage.setItem("popupShown", "true"); // mark as shown
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-8 shadow-xl max-w-md text-center relative">
        
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
        <p className="text-gray-300 mb-6">
          This is a <span className="font-semibold">showcase/hobby project</span>.  
          You can use dummy email and password credentials to explore the features.  
          No real accounts are needed.
        </p>

        <button
          onClick={() => setShowPopup(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default FirstTimePopup;
