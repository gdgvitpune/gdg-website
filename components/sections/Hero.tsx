'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ExpandableNavbar from '@/components/RollingExpandableNavbar2';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrambleTextPlugin);

export function Hero() {
    const gdgRef = useRef(null);
    const vitRef = useRef(null);
    const taglineRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        gsap.to(gdgRef.current, {
            duration: 2.5,
            scrambleText: {
                text: "Google Developer Groups",
                chars: "01XOGDL",
                revealDelay: 0.5,
                speed: 0.2
            },
            delay: 0.5
        });

        gsap.to(vitRef.current, {
            duration: 2.5,
            scrambleText: {
                text: "Vishwakarma Institute of Technology, Pune",
                chars: "!@#$%^&*",
                revealDelay: 0.7,
                speed: 0.2
            },
            delay: 2
        });

        gsap.to(taglineRef.current, {
            duration: 2,
            scrambleText: {
                text: "Learn. Build. Innovate.",
                chars: "._-+=",
                revealDelay: 0.6,
                speed: 0.2
            },
            delay: 3.5
        });
    }, []);

    return (
        <section id="home" className="relative h-screen w-full flex items-center overflow-hidden">
            <ExpandableNavbar />
            
            {/* Newsletter Button - Top Right */}
            <motion.div 
                className="fixed top-6 right-6 z-50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 4, duration: 0.4 }}
            >
                <Link href="/newsletter">
                    <motion.div
                        className="relative overflow-hidden"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        {/* Button */}
                        <motion.button
                            className="relative flex items-center gap-2.5 px-4 py-2 font-mono text-sm border-2 border-gray-600 hover:border-white transition-colors duration-200 uppercase tracking-wider overflow-hidden"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {/* White fill background */}
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: '-100%' }}
                                animate={{ x: isHovered ? '0%' : '-100%' }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            />
                            
                            {/* Content */}
                            <Mail 
                                className="w-4 h-4 relative z-10" 
                                strokeWidth={2.5}
                                style={{ color: isHovered ? '#000000' : '#e5e7eb' }}
                            />
                            <motion.span 
                                className="relative z-10"
                                style={{ color: isHovered ? '#000000' : '#e5e7eb' }}
                            >
                                {isHovered ? 'To the Stars!' : 'Newsletter'}
                            </motion.span>
                            
                            {/* Subtle corner accents */}
                            <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400/40 z-0" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400/40 z-0" />
                        </motion.button>
                    </motion.div>
                </Link>
            </motion.div>

            <div className="absolute inset-0 z-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center md:object-[20%_center] lg:object-left opacity-70 md:opacity-100"
                >
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black md:from-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-center md:justify-end">
                <div className="text-center md:text-right max-w-2xl md:translate-x-12 md:-translate-y-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 drop-shadow-2xl">
                        <span 
                            ref={gdgRef}
                            className="bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-500"
                        >
                            
                        </span>
                    </h1>

                    <p
                        ref={vitRef}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium tracking-wide mb-3 md:mb-4"
                    >
                        
                    </p>

                    <p
                        ref={taglineRef}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-light tracking-wider"
                    >
                        
                    </p>
                </div>
            </div>
        </section>
    );
}