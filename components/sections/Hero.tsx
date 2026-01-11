'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import ExpandableNavbar from '@/components/RollingExpandableNavbar2';

// Register the plugin
gsap.registerPlugin(ScrambleTextPlugin);

export function Hero() {
    const gdgRef = useRef(null);
    const vitRef = useRef(null);
    const taglineRef = useRef(null);

    useEffect(() => {
        // Scramble "Google Developer Groups" - slower
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

        // Scramble "Vishwakarma Institute of Technology" - slower
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

        // Scramble tagline - slower
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
        <section className="relative h-screen w-full flex items-center overflow-hidden">
            <ExpandableNavbar />
            {/* Background Video - Left Aligned */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-[20%_center] md:object-left"
                >
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
            </div>

            {/* Content - Right Aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-end">
                <div className="text-right max-w-2xl translate-x-6 -translate-y-8 md:translate-x-12 md:-translate-y-10">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 drop-shadow-2xl">
                        <span 
                            ref={gdgRef}
                            className="bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-500"
                        >
                            
                        </span>
                    </h1>

                    <p
                        ref={vitRef}
                        className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide mb-4"
                    >
                        
                    </p>

                    <p
                        ref={taglineRef}
                        className="text-lg md:text-xl text-gray-400 font-light tracking-wider"
                    >
                        
                    </p>
                </div>
            </div>
        </section>
    );
}