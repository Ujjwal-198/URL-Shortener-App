import React, { useState } from "react";

const AboutModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition z-40 text-sm font-medium cursor-pointer"
      >
        About Me
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <div className="bg-gray-900 text-white rounded-xl p-8 max-w-md shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">👋 About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              Hi, I’m <span className="font-semibold">Ujjwal Singh</span>, a 
              Computer Science student passionate about web development and AI.  
              This project was built to showcase my MERN stack skills including 
              React, Node.js, Express, and MongoDB.  
            </p>
            <p className="mt-4 text-gray-400">
              Connect with me on:
              <br />
              <a
                href="https://github.com/Ujjwal-198"
                target="_blank"
                className="underline hover:text-blue-400"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/ujjwal-singh-b44256271"
                target="_blank"
                className="underline hover:text-blue-400"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutModal;
