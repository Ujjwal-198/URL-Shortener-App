// AnalyticsPopup.jsx
import React from "react";
import Button from "./Button";

const AnalyticsPopup = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Popup Container */}
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded"
          >
            Close
          </Button>
        </div>

        
        <div className="space-y-4 text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPopup;
