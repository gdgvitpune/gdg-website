'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AndroidMascotProps {
  isHappy?: boolean;
}

export default function AndroidMascot({ isHappy = false }: AndroidMascotProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isFixed, setIsFixed] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mascotRef.current) {
        const rect = mascotRef.current.getBoundingClientRect();
        const mascotCenterX = rect.left + rect.width / 2;
        const mascotCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - mascotCenterX;
        const deltaY = e.clientY - mascotCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        // Maximum distance the pupil can move from center
        const maxDistance = 4;
        const distance = Math.min(
          Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100,
          1
        ) * maxDistance;

        setEyePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Find the newsletter section's container
      const newsletterContainer = document.querySelector('section');
      if (newsletterContainer) {
        const rect = newsletterContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If section bottom is still below viewport bottom, keep fixed
        // If section bottom is above viewport bottom, switch to absolute
        setIsFixed(rect.bottom > viewportHeight);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show mascot on desktop screens
  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      ref={mascotRef}
      className={`${isFixed ? 'fixed' : 'absolute'} right-8 z-50 pointer-events-none select-none`}
      style={{ bottom: '-40px' }}
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, type: 'spring', bounce: 0.3 }}
    >
      <motion.div
        className="relative w-48 h-48"
        animate={isHappy ? {} : {}}
        transition={{ duration: 0.8, repeat: isHappy ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Android Head SVG */}
        <div className="relative w-48 h-48">
          <Image
            src="/android_head.svg"
            alt="Android Mascot"
            width={192}
            height={192}
            className="w-full h-full drop-shadow-2xl"
            priority
          />
        </div>

        {/* Eyes positioned absolutely on top of SVG */}
        <div className="absolute top-[105px] left-1/2 -translate-x-1/2 w-31 flex justify-between px-2">
          {/* Left Eye */}
          <div className="relative w-6 h-6 bg-white rounded-full shadow-sm">
            <motion.div
              className="absolute w-4 h-4 bg-gray-900 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-8px',
                marginLeft: '-8px',
              }}
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {/* Pupil shine */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
            </motion.div>
          </div>

          {/* Right Eye */}
          <div className="relative w-6 h-6 bg-white rounded-full shadow-sm">
            <motion.div
              className="absolute w-4 h-4 bg-gray-900 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-8px',
                marginLeft: '-8px',
              }}
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {/* Pupil shine */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
            </motion.div>
          </div>
        </div>

        {/* Smile - Only show when hovered */}
        {isHappy && (
          <motion.div
            className="absolute top-[115px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.15, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <path
                d="M 2 2 Q 12 10 22 2"
                stroke="#2D2D2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        )}

        {/* Neutral mouth - Show when not happy */}
        {!isHappy && (
          <motion.div
            className="absolute top-[120px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
              <path
                d="M 2 2 L 14 2"
                stroke="#2D2D2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        )}

        {/* Shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 rounded-full blur-md" />
      </motion.div>
    </motion.div>
  );
}
