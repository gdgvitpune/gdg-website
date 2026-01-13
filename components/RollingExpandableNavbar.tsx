import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Events', href: '#events' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
];

export default function ExpandableNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const leftItems = navItems.slice(0, 3);
  const rightItems = navItems.slice(3);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="relative flex items-center justify-center h-20">
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Left Navigation Bar */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex items-center gap-2 mr-3 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 overflow-hidden"
              >
                {leftItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white"
                    onClick={() => setIsExpanded(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>

              {/* Right Navigation Bar */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex items-center gap-2 ml-3 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 overflow-hidden"
              >
                {rightItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white"
                    onClick={() => setIsExpanded(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Logo Button - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black flex items-center justify-center shadow-lg shadow-black/50 border-2 border-white/20 group"
        >
          {/* Image with hover highlight */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-all duration-300 ease-in-out">
            <img src="/gdg.png" alt="GDG Logo" className="w-15 h-7" />
          </div>
        </button>
      </div>

      {/* Backdrop overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}