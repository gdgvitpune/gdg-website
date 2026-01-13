'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import ExpandableNavbar from '@/components/RollingExpandableNavbar2';

gsap.registerPlugin(ScrambleTextPlugin);

export function Hero() {
    const gdgRef = useRef(null);
    const vitRef = useRef(null);
    const taglineRef = useRef(null);

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