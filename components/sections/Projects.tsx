'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        title: "Project Alpha",
        description: "A revolutionary AI-driven platform that transforms how we interact with data. Built with Next.js and TensorFlow.",
        color: "bg-yellow-100"
    },
    {
        title: "Project Beta",
        description: "Sustainable energy monitoring system using IoT sensors and real-time analytics dashboard.",
        color: "bg-green-100"
    },
    {
        title: "Project Gamma",
        description: "Blockchain-based supply chain management solution ensuring transparency and security.",
        color: "bg-blue-100"
    },
    {
        title: "Project Delta",
        description: "Augmented Reality educational app making learning immersive and interactive for students.",
        color: "bg-purple-100"
    },
    {
        title: "Project Epsilon",
        description: "Smart city traffic management system optimizing flow and reducing congestion.",
        color: "bg-red-100"
    }
];

// removed unused Image import to satisfy lint

export function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section id="projects" ref={targetRef} className="relative h-[300vh] ">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {/* Background Image */}
               

                {/* Content */}
                <div className="relative z-10 w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-center text-white mb-12"
                    >
                        Projects
                    </motion.h2>

                    <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24 items-center">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="group relative h-[70vh] w-[90vw] md:w-[70vw] flex-shrink-0 overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300"
                            >
                                <div className={`absolute inset-0 ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                                <div className="relative h-full flex flex-col md:flex-row p-8 md:p-12 gap-8">
                                    {/* Image Placeholder */}
                                    <div className={`w-full md:w-1/2 h-1/2 md:h-full rounded-2xl ${project.color} opacity-80 shadow-2xl`} />

                                    <div className="flex flex-col justify-center md:w-1/2">
                                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">{project.title}</h3>
                                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <button className="mt-8 w-fit px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium">
                                            View Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
