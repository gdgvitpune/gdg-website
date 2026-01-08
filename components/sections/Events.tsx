'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const events = [
    {
        title: "BIT N BUILD",
        subtitle: "INTERNATIONAL HACKATHON",
        date: "OCT 12",
        description: "48-hour hackathon to transform your ideas into working prototypes.",
        color: "from-red-500 to-orange-500",
        imageGradient: "bg-gradient-to-br from-red-900 to-black"
    },
    {
        title: "Future Tech",
        subtitle: "2024",
        date: "NOV 24",
        description: "Exploring cutting-edge innovations and future technology trends.",
        color: "from-orange-400 to-yellow-500",
        imageGradient: "bg-gradient-to-br from-orange-900 to-black"
    }
];

export function Events() {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-center mb-16 text-white uppercase tracking-widest"
                >
                    Upcoming Events
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-orange-500/50 transition-colors duration-300`}
                        >
                            {/* Neon Glow Effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${event.color} blur-xl`} />

                            <div className="relative p-6 h-full flex flex-col">
                                {/* Image Placeholder */}
                                <div className={`h-48 rounded-2xl mb-6 ${event.imageGradient} flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <h3 className="text-3xl font-bold text-white z-10 drop-shadow-lg">{event.title}</h3>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-orange-400 text-sm font-bold tracking-wider mb-4">{event.subtitle}</p>

                                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                                        <Calendar size={16} />
                                        <span>{event.date}</span>
                                    </div>

                                    <p className="text-gray-300 mb-6">{event.description}</p>
                                </div>

                                <button className="w-full py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group-hover:border-orange-500/50">
                                    View Event <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
