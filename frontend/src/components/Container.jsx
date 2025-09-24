import React, { useRef, useEffect } from "react";

const Container = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = [];
    const STAR_COUNT = 120;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedY: Math.random() *  0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
      });
    }

    const animate = () => {
      // Background
      ctx.fillStyle = "#1f2937"; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#9ca3af"; 
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        
        star.y += star.speedY;
        star.x += star.speedX;

        
        if (star.y > height || star.x < 0 || star.x > width) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <main className="flex-grow container mx-auto px-2 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Container;
