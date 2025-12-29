'use client';

import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" /> {/* Gradient Overlay */}
            </div>

            {/* Content - Right Aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-end">
                <div className="text-right max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 drop-shadow-2xl"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-500">Google</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-400">Developer</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-300 to-gray-600">Groups</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide"
                    >
                        Vishwakarma Institute of Technology, Pune
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
