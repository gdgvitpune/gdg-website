'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { CustomTypewriter } from '../ui/CustomTypewriter';

export function Mission() {
    const missionText = "Empower students to learn, build, and innovate using Google technologies while solving real-world problems through collaboration and community learning";

    return (
<section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white mb-12"
                >
                    Our Mission
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-auto"
                >
                    <GlassCard className="p-8 md:p-12 bg-orange-950/20 border-orange-500/20 min-h-[300px] flex items-center justify-center">
                        <CustomTypewriter 
                            text={missionText}
                            speed={30}
                            className="text-lg md:text-2xl text-gray-200 leading-relaxed"
                        />
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
