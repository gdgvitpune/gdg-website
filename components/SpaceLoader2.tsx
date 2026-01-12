import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Contact Us', href: '#contact' }
];

export default function ExpandableNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 1000;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftItems = navItems.slice(0, 3);
  const rightItems = navItems.slice(3);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 500);
  };

  const handleToggle = () => {
    if (isExpanded) {
      handleClose();
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* Demo content for scrolling */}
      <div className="min-h-[300vh] bg-gradient-to-b from-gray-900 via-black to-gray-900 pointer-events-auto">
        <div className="container mx-auto px-4 pt-32">
          <div className="text-white text-center space-y-8">
            <h1 className="text-4xl font-bold">Scroll Down to See the Corruption Grow</h1>
            <p className="text-xl text-gray-400">Watch as the Dark Side (red) and Light Side (blue) spread from the center</p>
            <div className="mt-20 space-y-4">
              <p>Scroll Progress: {Math.round(scrollProgress * 100)}%</p>
              <p>Keep scrolling...</p>
            </div>
          </div>
        </div>
      </div>

      <motion.nav
        className="fixed z-50"
        style={{ pointerEvents: 'auto' }}
        animate={{
          top: '50px',
          left: isExpanded && !isClosing ? '50%' : '50px',
          x: isExpanded && !isClosing ? '-50%' : '0',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: isClosing ? 0.8 : 0 }}
      >
        <div className="relative flex items-center">
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Left side - Red corruption (Dark Side) */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isClosing ? 0 : 'auto', opacity: isClosing ? 0 : 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut', delay: isClosing ? 0 : 0.5 }}
                  className="flex items-center gap-2 pr-20 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 relative"
                  style={{ overflow: 'visible' }}
                >
                  {/* Red corruption canvas */}
                  <svg 
                    className="absolute top-1/2 pointer-events-none"
                    style={{ 
                      left: '-10px',
                      width: '250px', 
                      height: '80px',
                      transform: 'translateY(-50%)',
                      overflow: 'visible'
                    }}
                  >
                    <defs>
                      <filter id="redGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {[...Array(10)].map((_, i) => {
                      const startY = 40 + (i - 5) * 3;
                      const endY = startY + (Math.random() - 0.5) * 20;
                      const length = 200 * scrollProgress;
                      const controlX = length * 0.6;
                      const controlY = startY + (Math.random() - 0.5) * 15;
                      
                      return (
                        <motion.path
                          key={i}
                          d={`M 10 ${startY} Q ${controlX} ${controlY} ${length} ${endY}`}
                          stroke="#ff0000"
                          strokeWidth={1 + Math.random() * 1.5}
                          fill="none"
                          filter="url(#redGlow)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: scrollProgress > 0 ? 1 : 0 }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          opacity={0.5 + Math.random() * 0.5}
                        />
                      );
                    })}
                  </svg>

                  {leftItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isClosing ? 0 : 1, x: isClosing ? -20 : 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: isClosing ? 0 : 0.5 + index * 0.08, duration: 0.3 }}
                      className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white relative z-10"
                      onClick={handleClose}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Right side - Blue corruption (Light Side) */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isClosing ? 0 : 'auto', opacity: isClosing ? 0 : 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut', delay: isClosing ? 0 : 0.5 }}
                  className="flex items-center gap-2 pl-20 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 relative"
                  style={{ overflow: 'visible' }}
                >
                  {/* Blue corruption canvas */}
                  <svg 
                    className="absolute top-1/2 pointer-events-none"
                    style={{ 
                      right: '-10px',
                      width: '250px', 
                      height: '80px',
                      transform: 'translateY(-50%)',
                      overflow: 'visible'
                    }}
                  >
                    <defs>
                      <filter id="blueGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {[...Array(10)].map((_, i) => {
                      const startY = 40 + (i - 5) * 3;
                      const endY = startY + (Math.random() - 0.5) * 20;
                      const length = 200 * scrollProgress;
                      const startX = 240;
                      const endX = startX - length;
                      const controlX = startX - (length * 0.6);
                      const controlY = startY + (Math.random() - 0.5) * 15;
                      
                      return (
                        <motion.path
                          key={i}
                          d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                          stroke="#00bfff"
                          strokeWidth={1 + Math.random() * 1.5}
                          fill="none"
                          filter="url(#blueGlow)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: scrollProgress > 0 ? 1 : 0 }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          opacity={0.5 + Math.random() * 0.5}
                        />
                      );
                    })}
                  </svg>

                  {rightItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: isClosing ? 0 : 1, x: isClosing ? 20 : 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: isClosing ? 0 : 0.5 + index * 0.08, duration: 0.3 }}
                      className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white relative z-10"
                      onClick={handleClose}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleToggle}
            className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg shadow-black/50 border-2 border-white/20 group z-10"
            animate={{ rotate: isExpanded && !isClosing ? 360 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: isClosing ? 0.4 : 0 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-all duration-300 ease-in-out">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">
                GDG
              </div>
            </div>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={handleClose}
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}