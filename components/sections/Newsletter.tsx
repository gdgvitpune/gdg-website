'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Send, Rocket, Sparkles } from 'lucide-react';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const rocketControls = useAnimation();
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate rocket floating
        rocketControls.start({
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [rocketControls]);

    useEffect(() => {
        // Create floating stars
        if (starsRef.current) {
            const createStar = () => {
                const star = document.createElement('div');
                star.className = 'absolute w-1 h-1 bg-white rounded-full';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
                star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
                starsRef.current?.appendChild(star);

                setTimeout(() => {
                    star.remove();
                }, 5000);
            };

            const interval = setInterval(createStar, 300);
            return () => clearInterval(interval);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Launch animation
        await rocketControls.start({
            y: -1000,
            x: 200,
            rotate: 45,
            scale: 0.5,
            transition: {
                duration: 2,
                ease: "easeIn"
            }
        });

        setIsSubmitted(true);

        // Reset rocket position after submission
        setTimeout(() => {
            rocketControls.set({ y: 0, x: 0, rotate: 0, scale: 1 });
            rocketControls.start({
                y: [0, -20, 0],
                rotate: [-5, 5, -5],
                transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            });
        }, 2500);

        // Reset form
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
            setName('');
        }, 4000);
    };

    return (
        <section id="newsletter" className="relative py-24 px-6 overflow-hidden">
            {/* Animated stars background */}
            <div ref={starsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-400/70" />
                            <span className="text-sm font-semibold text-yellow-400/70 uppercase tracking-wider">
                                Join Our Community
                            </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-blue-400/80">Launch </span>
                            <span className="text-red-400/80">Your </span>
                            <span className="text-yellow-300/80">Journey</span>
                            <br />
                            <span className="text-white">With GDG VIT Pune</span>
                        </h2>
                        
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Stay updated with our latest events, workshops, and tech talks. 
                            Join our community of developers and innovators exploring the cosmos of technology.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="glass rounded-lg px-4 py-2">
                                <p className="text-sm text-gray-400">Events</p>
                                <p className="text-xl font-bold text-white">20+</p>
                            </div>
                            <div className="glass rounded-lg px-4 py-2">
                                <p className="text-sm text-gray-400">Active Members</p>
                                <p className="text-xl font-bold text-white">100+</p>
                            </div>
                            <div className="glass rounded-lg px-4 py-2">
                                <p className="text-sm text-gray-400">Projects</p>
                                <p className="text-xl font-bold text-white">10+</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side - Form with rocket animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Rocket animation */}
                        <motion.div
                            animate={rocketControls}
                            className="absolute -top-20 right-10 z-20 pointer-events-none"
                        >
                            <Rocket className="w-16 h-16 text-red-500" fill="currentColor" />
                            <motion.div
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-6 h-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-full blur-sm" />
                            </motion.div>
                        </motion.div>

                        {/* Newsletter form */}
                        <div className="glass rounded-3xl p-8 md:p-12 backdrop-blur-xl border-2 border-white/10 shadow-2xl">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="w-full bg-green-600/80 hover:bg-green-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onHoverStart={() => setIsHovered(true)}
                                        onHoverEnd={() => setIsHovered(false)}
                                    >
                                        <span className="relative z-10">Join the Community</span>
                                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                        
                                        {isHovered && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-green-400/50 via-yellow-300/50 via-red-400/50 to-blue-400/50"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '100%' }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.button>

                                    <p className="text-xs text-gray-400 text-center">
                                        We respect your privacy. Unsubscribe at any time.
                                    </p>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <svg
                                            className="w-10 h-10 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard! 🚀</h3>
                                    <p className="text-gray-300">
                                        Check your email to confirm your subscription.
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.5, 0.3, 0.5]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `}</style>
        </section>
    );
}
