'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Newsletter() {
    return (
        <section id="newsletter" className="relative py-24 px-6 overflow-hidden">
            {/* Gradient orbs */}
            <motion.div 
                className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.2, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Icon Badge */}
                    <motion.div 
                        className="flex items-center justify-center gap-2 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-6 h-6 text-yellow-400/70" />
                        </motion.div>
                        <span className="text-sm font-semibold text-yellow-400/70 uppercase tracking-wider">
                            Join Our Community
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-blue-400/80">Stay </span>
                        <span className="text-red-400/80">Connected </span>
                        <span className="text-yellow-300/80">With</span>
                        <br />
                        <span className="text-white">GDG VIT Pune</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p 
                        className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Get exclusive updates on events, workshops, and tech talks. 
                        Join our community of developers exploring the cosmos of technology.
                    </motion.p>

                    {/* Stats */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-6 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {[
                            { label: 'Events', value: '20+', delay: 0.6 },
                            { label: 'Active Members', value: '100+', delay: 0.7 },
                            { label: 'Projects', value: '10+', delay: 0.8 }
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="glass rounded-lg px-6 py-3 hover:bg-white/10 transition-all cursor-default group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: stat.delay }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {stat.value}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/newsletter">
                            <motion.button
                                className="group relative px-8 py-4 bg-white hover:bg-gray-100 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '200%' }}
                                    transition={{ duration: 0.6 }}
                                />
                                
                                <span className="relative z-10">Subscribe to Newsletter</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Privacy note */}
                    <motion.p 
                        className="text-xs text-gray-400 mt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        viewport={{ once: true }}
                    >
                        Join 500+ developers. No spam, unsubscribe anytime.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}