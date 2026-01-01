'use client';

import { motion } from 'framer-motion';
import { Zap, Crown, Trophy } from 'lucide-react';

const achievements = [
    {
        icon: Zap,
        title: "Hackathon Winner",
        subtitle: "at Smart India Hackathon",
        color: "text-yellow-400",
        glow: "shadow-yellow-400/50"
    },
    {
        icon: Crown,
        title: "Best Innovation",
        subtitle: "at TechCrunch Disrupt",
        color: "text-green-400",
        glow: "shadow-green-400/50"
    },
    {
        icon: Trophy,
        title: "Top Performer",
        subtitle: "at Google Cloud Campaign",
        color: "text-blue-400",
        glow: "shadow-blue-400/50"
    }
];

import Image from 'next/image';

export function Achievements() {
    return (
        <section id="achievements" className="min-h-screen flex flex-col justify-center py-20 bg-black relative overflow-hidden">
            {/* Background Image - Zoomed and Darkened */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/mission-bg.jpg"
                    alt="Achievements Background"
                    fill
                    className="object-cover scale-125"
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/80" /> {/* Dark overlay */}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-center mb-20 text-white"
                >
                    Achievements
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300 group"
                        >
                            <div className={`w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300`}>
                                {/* Glow effect */}
                                <div className={`absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity ${item.color.replace('text-', 'bg-')}`} />
                                <item.icon size={40} className={item.color} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.subtitle}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
