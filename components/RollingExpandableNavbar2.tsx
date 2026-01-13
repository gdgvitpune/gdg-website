"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Our Mission", href: "#mission" },
  { label: "Events", href: "#events" },
  { label: "Achievements", href: "#achievements" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

export default function ExpandableNavbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const leftItems = navItems.slice(0, 3)
  const rightItems = navItems.slice(3)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsExpanded(false)
      setIsClosing(false)
    }, 1200)
  }

  const handleToggle = () => {
    if (isExpanded) {
      handleClose()
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <>
      <div className="fixed top-[30px] left-0 w-full z-50 pointer-events-none hidden lg:block">
        <div className="relative w-full h-16">
          <AnimatePresence>
            {!isExpanded && !isClosing && (
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 left-[130px] text-white font-semibold text-lg whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                GDSC VIT Pune
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleToggle}
            className="absolute top-0 w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg shadow-black/50 border-2 border-white/20 group z-10 pointer-events-auto"
            animate={{
              left: isExpanded && !isClosing ? "calc(50% - 32px)" : "50px",
              rotate: isExpanded ? (isClosing ? 720 : 360) : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isClosing ? 0.7 : 0,
            }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-all duration-300 ease-in-out">
              <img src="/gdg.png" alt="GDG Logo" className="w-15 h-7" />
            </div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: isClosing ? 0.9 : 0.3 }}
              >
                {/* Left menu */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isClosing ? 0 : "auto",
                    opacity: isClosing ? 0 : 1,
                  }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    duration: isClosing ? 0.6 : 0.4,
                    ease: "easeInOut",
                    delay: isClosing ? 0.25 : 0.4,
                  }}
                  className="flex items-center gap-2 pr-20 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 overflow-hidden"
                >
                  {leftItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isClosing ? 0 : 1,
                        x: isClosing ? -30 : 0,
                      }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        delay: isClosing ? (leftItems.length - 1 - index) * 0.08 : 0.5 + index * 0.08,
                        duration: 0.2,
                      }}
                      className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white"
                      onClick={handleClose}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Right menu */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isClosing ? 0 : "auto",
                    opacity: isClosing ? 0 : 1,
                  }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    duration: isClosing ? 0.6 : 0.4,
                    ease: "easeInOut",
                    delay: isClosing ? 0.25 : 0.4,
                  }}
                  className="flex items-center gap-2 pl-20 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 overflow-hidden"
                >
                  {rightItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isClosing ? 0 : 1,
                        x: isClosing ? 30 : 0,
                      }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        delay: isClosing ? (rightItems.length - 1 - index) * 0.08 : 0.5 + index * 0.08,
                        duration: 0.2,
                      }}
                      className="px-4 py-2 text-white hover:text-black transition-all duration-300 text-sm font-medium whitespace-nowrap rounded-full hover:bg-white"
                      onClick={handleClose}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}
