"use client"
import React, { useState, useEffect } from 'react';

// Reusable SpaceLoader Component
interface SpaceLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const SpaceLoader = ({ onComplete, duration = 3000 }: SpaceLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 16; // ~60fps
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  // Calculate rocket position on curved path
  const getRocketPosition = (progress: number) => {
    const t = progress / 100;
    const startX = 15;
    const endX = 85;
    const startY = 20;
    const endY = 20;
    const controlY = -10;

    const x = startX + (endX - startX) * t;
    const y = startY + 4 * controlY * t * (1 - t) + endY * t * t;

    return { x, y };
  };

  const rocketPos = getRocketPosition(progress);
  const numBars = 12;
  const filledBars = Math.floor((progress / 100) * numBars);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Space GIF Background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/space.gif"
          alt="Space background"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      
      {/* Cockpit PNG Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/spaceship.png"
          alt="Cockpit"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 z-15 pointer-events-none scanlines"></div>

      {/* CRT Screen Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative w-[800px] h-[450px] flex items-center justify-center translate-y-40">
          <div className="w-full h-full flex flex-col items-center justify-center px-15">
            {/* Earth, Rocket, Black Hole Animation */}
            <div className="relative w-full h-32 mb-8">
              {/* Earth - Top Left */}
              <div className="absolute" style={{
                left: '20%',
                top: '20%',
                transform: 'translate(-50%, -50%)'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/earth.png"
                  alt="Earth"
                  className="w-65 h-65 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              {/* Black Hole - Top Right */}
              <div className="absolute" style={{
                left: '80%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/blackhole.jpg"
                  alt="Black Hole"
                  className="w-80 h-80 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              {/* Rocket - Moving along path */}
              <div
                className="absolute transition-all duration-100 ease-linear"
                style={{
                  left: `${rocketPos.x}%`,
                  top: `${rocketPos.y + 20}%`,
                  transform: `translate(-50%, -50%) rotate(${progress * 0.3}deg)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rocket.png"
                  alt="Rocket"
                  className="w-12 h-12 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>

            {/* TRANSFERRING Text */}
            <div className="text-[#a9c7a9] text-2xl font-mono tracking-widest mb-6 pixel-text">
              TRANSFERRING...
            </div>

            {/* Classic Windows-style Progress Bar */}
            <div className="w-full max-w-md bg-gray-900 rounded-none p-1 border-4 border-[#a9c7a9] shadow-lg shadow-[#00ff00]/50">
              <div className="flex gap-1 h-10 bg-black p-1">
                {[...Array(numBars)].map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 transition-all duration-150 ${
                      index < filledBars
                        ? 'bg-[#a9c7a9] shadow-sm shadow-[#95ad95]'
                        : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Percentage */}
            <div className="text-[#a9c7a9] text-xl font-mono mt-6 pixel-text tracking-wider">
              {Math.floor(progress)}% LOADING...
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
        }

        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        .pixel-text {
          text-shadow: 2px 2px 0px rgba(0, 255, 0, 0.5);
          letter-spacing: 0.2em;
        }
      `}</style>
    </div>
  );
};

export default SpaceLoader;