"use client"
import React, { useState } from 'react';

// Reusable SpaceLoader Component
interface SpaceLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const SpaceLoader = ({ onComplete, duration = 3000 }: SpaceLoaderProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleMissionStart = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setFadeOut(true);
    if (onComplete) {
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        {/* Space GIF Background - Shows until video plays */}
        {!showVideo && (
          <div className="absolute inset-0 z-0">
            <img
              src="/space.gif"
              alt="Space background"
              className="w-full h-full object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}

        {/* Video Player - Full Screen Behind Everything */}
        {showVideo && (
          <div className="absolute inset-0 z-0">
            <video
              src="/space.mp4"
              autoPlay
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}
        
        {/* Cockpit PNG Overlay - Always visible */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img
            src="/spaceship.png"
            alt="Cockpit"
            className="w-full h-full object-cover scale-105"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 z-15 pointer-events-none scanlines"></div>

        {/* Content Layer */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative w-[800px] h-[450px] flex items-center justify-center translate-y-35">
            {!showVideo ? (
              /* Mission Briefing Terminal */
              <div className="w-full h-full flex flex-col items-start justify-center px-40 space-y-4">
                <div className="terminal-text text-[#a9c7a9] text-[8px] leading-relaxed">
                  <div className="mb-4">
                    <span className="text-[#a9c7a9]">{'>'}</span> INITIALIZING MISSION PROTOCOL...
                  </div>
                  <div className="mb-4">
                    <span className="text-[#a9c7a9]">{'>'}</span> COORDINATES LOCKED
                  </div>
                  <div className="mb-8">
                    <span className="text-[#a9c7a9]">{'>'}</span> DESTINATION: EVENT HORIZON
                  </div>
                  
                  <div className="mb-6 pl-4 border-l-2 border-[#a9c7a9] text-[8px]">
                    <p className="mb-3">MISSION BRIEFING:</p>
                    <p className="mb-3">
                      You are about to embark on a journey to the most
                    </p>
                    <p className="mb-3">
                      mysterious phenomenon in the known universe - a
                    </p>
                    <p className="mb-3">
                      supermassive black hole. Beyond the event horizon,
                    </p>
                    <p className="mb-3">
                      the laws of physics as we know them cease to exist.
                    </p>
                    <p className="mb-3">
                      Time dilates. Space warps. Reality bends.
                    </p>
                    <p>
                      There is no return from this voyage.
                    </p>
                  </div>

                  <div className="mb-3 text-[8px]">
                    <span className="text-[#a9c7a9]">{'>'}</span> AWAITING CONFIRMATION...
                  </div>
                </div>

                {/* Game-style Option */}
                <div className="w-full flex items-center space-x-3 pl-4">
                  <span className="terminal-text text-[#a9c7a9] text-sm">{'>'}</span>
                  <button
                    onClick={handleMissionStart}
                    className="terminal-text text-[#a9c7a9] text-[8px] bg-transparent border-2 border-[#a9c7a9] px-6 py-2 hover:bg-[#a9c7a9] hover:text-black transition-all duration-200 cursor-pointer uppercase tracking-wider"
                  >
                    [ LET'S GO ]
                  </button>
                </div>
              </div>
            ) : (
              /* Status Text During Video */
              <div className="w-full h-full flex flex-col items-start justify-center px-40">
                <div className="terminal-text text-[#a9c7a9] text-[8px] leading-relaxed">
                  <div className="mb-4">
                    <span className="text-[#a9c7a9]">{'>'}</span> MISSION INITIATED...
                  </div>
                  <div className="mb-4">
                    <span className="text-[#a9c7a9]">{'>'}</span> ENTERING WARP DRIVE
                  </div>
                  <div className="mb-4">
                    <span className="text-[#a9c7a9]">{'>'}</span> APPROACHING EVENT HORIZON...
                  </div>
                  <div className="mb-4 animate-pulse">
                    <span className="text-[#a9c7a9]">{'>'}</span> SYSTEMS NOMINAL
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .terminal-text {
          font-family: 'Press Start 2P', monospace;
          text-shadow: 0 0 10px rgba(169, 199, 169, 0.8);
          line-height: 1.8;
        }

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
      `}</style>
    </div>
  );
};

export default SpaceLoader;