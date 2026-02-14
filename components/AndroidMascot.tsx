'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AndroidMascotProps {
  isHappy?: boolean;
  emotion?: 'neutral' | 'happy' | 'success' | 'sad';
}

export default function AndroidMascot({ isHappy = false, emotion = 'neutral' }: AndroidMascotProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isFixed, setIsFixed] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [persistentEmotion, setPersistentEmotion] = useState<'neutral' | 'happy' | 'success' | 'sad'>('neutral');
  const mascotRef = useRef<HTMLDivElement>(null);

  // Persist success emotion once it's triggered
  useEffect(() => {
    if (emotion === 'success' && persistentEmotion !== 'success') {
      setPersistentEmotion('success');
    } else if (emotion === 'sad' && persistentEmotion !== 'success') {
      // Don't override success with sad
      setPersistentEmotion('sad');
      // Reset sad emotion after 3 seconds
      const timeout = setTimeout(() => {
        setPersistentEmotion('neutral');
      }, 3000);
      return () => clearTimeout(timeout);
    } else if (emotion !== 'success' && emotion !== 'sad' && persistentEmotion !== 'success') {
      setPersistentEmotion(emotion);
    }
  }, [emotion, persistentEmotion]);

  // Cute random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mascotRef.current) {
        const rect = mascotRef.current.getBoundingClientRect();
        const mascotCenterX = rect.left + rect.width / 2;
        const mascotCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - mascotCenterX;
        const deltaY = e.clientY - mascotCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        const maxDistance = 5;
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
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newsletterContainer = document.querySelector('section');
      if (newsletterContainer) {
        const rect = newsletterContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setIsFixed(rect.bottom > viewportHeight);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isDesktop) {
    return null;
  }

  // Use persistent emotion instead of current emotion
  const currentEmotion = persistentEmotion || (isHappy ? 'happy' : 'neutral');

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
        animate={
          currentEmotion === 'success'
            ? { y: [0, -10, 0], rotate: [0, -5, 5, -5, 0] }
            : currentEmotion === 'sad'
            ? { y: [0, 2, 0] }
            : isHappy
            ? { y: [0, -8, 0] }
            : {}
        }
        transition={{
          duration: currentEmotion === 'success' ? 0.6 : 0.8,
          repeat: currentEmotion === 'success' ? 3 : isHappy ? Infinity : 0,
          ease: 'easeInOut',
        }}
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

        {/* Eyes - Bigger and cuter! */}
        <div className="absolute top-[102px] left-1/2 -translate-x-1/2 w-32 flex justify-between px-1">
          {/* Left Eye */}
          <motion.div
            className="relative w-8 h-8 bg-white rounded-full shadow-lg"
            animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute w-5 h-5 bg-gray-900 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px',
              }}
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
                scale: currentEmotion === 'success' ? [1, 1.2, 1] : 1,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {/* Bigger sparkles for cuteness */}
              <div className="absolute top-0.5 left-1 w-2 h-2 bg-white rounded-full opacity-90" />
              <div className="absolute bottom-1 right-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
            </motion.div>
          </motion.div>

          {/* Right Eye */}
          <motion.div
            className="relative w-8 h-8 bg-white rounded-full shadow-lg"
            animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute w-5 h-5 bg-gray-900 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px',
              }}
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
                scale: currentEmotion === 'success' ? [1, 1.2, 1] : 1,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {/* Bigger sparkles */}
              <div className="absolute top-0.5 left-1 w-2 h-2 bg-white rounded-full opacity-90" />
              <div className="absolute bottom-1 right-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Blush cheeks - always visible when happy or success */}
        <AnimatePresence>
          {(isHappy || currentEmotion === 'happy' || currentEmotion === 'success') && (
            <>
              <motion.div
                className="absolute top-[108px] left-[35px] w-6 h-4 bg-pink-400/40 rounded-full blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
              <motion.div
                className="absolute top-[108px] right-[35px] w-6 h-4 bg-pink-400/40 rounded-full blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Success celebration - Big smile with sparkles - PERSISTS */}
        {currentEmotion === 'success' && (
          <motion.div
            className="absolute top-[118px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path
                d="M 3 3 Q 16 14 29 3"
                stroke="#2D2D2D"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Sparkles around the smile - continue rotating */}
            <motion.div
              className="absolute -left-8 -top-2 text-yellow-400 text-xl"
              animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -right-8 -top-2 text-yellow-400 text-xl"
              animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}

        {/* Happy smile */}
        {(isHappy || currentEmotion === 'happy') && currentEmotion !== 'success' && (
          <motion.div
            className="absolute top-[118px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.15, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
              <path
                d="M 2 2 Q 14 12 26 2"
                stroke="#2D2D2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        )}

        {/* Sad face - for failed subscription */}
        {currentEmotion === 'sad' && (
          <motion.div
            className="absolute top-[118px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
              <path
                d="M 2 10 Q 14 2 26 10"
                stroke="#2D2D2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Tear drop */}
            <motion.div
              className="absolute left-[-12px] top-[-15px] w-2 h-3 bg-blue-400 rounded-full opacity-70"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 10, opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Neutral mouth */}
        {currentEmotion === 'neutral' && !isHappy && (
          <motion.div
            className="absolute top-[122px] left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="20" height="4" viewBox="0 0 20 4" fill="none">
              <path
                d="M 2 2 L 18 2"
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