// components/sections/Newsletter.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Rocket, Sparkles } from 'lucide-react';

interface NewsletterProps {
  onHoverChange?: (isHovered: boolean) => void;
}

export function Newsletter({ onHoverChange }: NewsletterProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    const starsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    // Create sparkle effect on button
    const createSparkle = (x: number, y: number) => {
        if (!buttonRef.current) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute pointer-events-none';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.innerHTML = `
            <div class="animate-sparkle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="white"/>
                </svg>
            </div>
        `;
        
        buttonRef.current.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Start rocket animation
        setIsLaunching(true);

        // Create sparkles during launch
        const sparkleInterval = setInterval(() => {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                createSparkle(x, y);
            }
        }, 100);

        // Wait for rocket to travel across button
        await new Promise(resolve => setTimeout(resolve, 1500));
        clearInterval(sparkleInterval);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
            } else {
                alert(data.error || 'Failed to subscribe. Please try again.');
                setIsLaunching(false);
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Failed to subscribe. Please try again.');
            setIsLaunching(false);
        }

        // Reset form after success animation
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
            setIsLaunching(false);
        }, 4000);
    };

    return (
        <section id="newsletter" className="relative py-24 px-6 overflow-hidden">
            {/* Animated stars background */}
            <div ref={starsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

            {/* Gradient orbs with enhanced glow */}
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

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="flex items-center gap-2 mb-4"
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
                        
                        <motion.h2 
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-blue-400/80 inline-block hover:scale-110 transition-transform cursor-default">Launch </span>
                            <span className="text-red-400/80 inline-block hover:scale-110 transition-transform cursor-default">Your </span>
                            <span className="text-yellow-300/80 inline-block hover:scale-110 transition-transform cursor-default">Journey</span>
                            <br />
                            <span className="text-white">With GDG VIT Pune</span>
                        </motion.h2>
                        
                        <motion.p 
                            className="text-gray-300 text-lg mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Stay updated with our latest events, workshops, and tech talks. 
                            Join our community of developers and innovators exploring the cosmos of technology.
                        </motion.p>

                        <motion.div 
                            className="flex flex-wrap gap-4 mb-8"
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
                                    className="glass rounded-lg px-4 py-2 hover:bg-white/10 transition-all cursor-default group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: stat.delay }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {stat.label}
                                    </p>
                                    <p className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {stat.value}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Newsletter form */}
                        <motion.div 
                            className="glass rounded-3xl p-8 md:p-12 backdrop-blur-xl border-2 border-white/10 shadow-2xl relative overflow-hidden"
                            whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Animated border gradient */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(239,68,68,0.3), rgba(251,191,36,0.3), rgba(34,197,94,0.3))',
                                    backgroundSize: '200% 200%',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div>
                                        <motion.label 
                                            htmlFor="email" 
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Email Address
                                        </motion.label>
                                        <motion.input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            disabled={isLaunching}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 hover:bg-white/10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>

                                    <motion.button
    ref={buttonRef}
    type="submit"
    disabled={isLaunching}
    className="w-full bg-white hover:bg-gray-100 text-green-600 font-semibold py-4 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-80"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    whileHover={!isLaunching ? { scale: 1.02, y: -2 } : {}}
    whileTap={!isLaunching ? { scale: 0.98 } : {}}
    onHoverStart={() => {
      if (!isLaunching) {
        setIsHovered(true);
        onHoverChange?.(true);
      }
    }}
    onHoverEnd={() => {
      setIsHovered(false);
      onHoverChange?.(false);
    }}
>
    {/* Rocket animation inside button */}
    {isLaunching && (
        <>
            <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30"
                initial={{ x: -50, rotate: 45 }}
                animate={{ x: '110vw', rotate: 45 }}
                transition={{ 
                    duration: 1.5, 
                    ease: [0.34, 1.56, 0.64, 1]
                }}
            >
                <Rocket className="w-8 h-8 text-green-600 drop-shadow-lg" fill="currentColor" />
                {/* Enhanced rocket flame trail */}
                <motion.div
                    className="absolute -bottom-2 -left-1 w-6 h-10"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(251,191,36,0.9), rgba(249,115,22,0.9), rgba(239,68,68,0.7))',
                        filter: 'blur(4px)',
                        borderRadius: '50%',
                    }}
                    animate={{
                        opacity: [0.8, 1, 0.8],
                        scale: [0.9, 1.3, 0.9],
                        scaleY: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {/* Smoke particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-400/40 rounded-full blur-sm"
                        style={{
                            left: -8 - i * 4,
                            top: 4,
                        }}
                        animate={{
                            opacity: [0.6, 0, 0],
                            scale: [0.5, 1.5, 0],
                            x: [-10, -30],
                            y: [0, 10]
                        }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </motion.div>
        </>
    )}

    <span className="relative z-10 font-bold tracking-wide">
        {isLaunching ? 'Launching...' : 'Join the Community'}
    </span>
    {!isLaunching && (
        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:rotate-12 transition-transform" />
    )}
    
    {/* Shimmer effect on hover */}
    {isHovered && !isLaunching && (
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/50 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
        />
    )}

    {/* Pulsing glow effect */}
    <motion.div
        className="absolute inset-0 bg-green-400/20 rounded-xl blur-xl"
        animate={{
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
</motion.button>

                                    <motion.p 
                                        className="text-xs text-gray-400 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        We respect your privacy. Unsubscribe at any time.
                                    </motion.p>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 relative z-10"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ 
                                            delay: 0.2, 
                                            type: "spring", 
                                            stiffness: 200,
                                            damping: 15
                                        }}
                                        className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
                                    >
                                        <motion.svg
                                            className="w-10 h-10 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                        >
                                            <motion.path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </motion.svg>
                                    </motion.div>
                                    {/* Celebration particles */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                                            style={{
                                                left: '50%',
                                                top: '40%',
                                            }}
                                            initial={{ scale: 0, x: 0, y: 0 }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                x: Math.cos((i / 12) * Math.PI * 2) * 100,
                                                y: Math.sin((i / 12) * Math.PI * 2) * 100,
                                            }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.3 + i * 0.05,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                    <motion.h3 
                                        className="text-2xl font-bold text-white mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        Welcome Aboard! 🚀
                                    </motion.h3>
                                    <motion.p 
                                        className="text-gray-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 }}
                                    >
                                        Check your email to confirm your subscription.
                                    </motion.p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Enhanced decorative elements */}
                        <motion.div
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.6, 0.3],
                                x: [0, 10, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"
                            animate={{
                                scale: [1.3, 1, 1.3],
                                opacity: [0.6, 0.3, 0.6],
                                x: [0, -10, 0],
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 4,
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
                
                @keyframes sparkle {
                    0% { opacity: 1; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
                
                .animate-sparkle {
                    animation: sparkle 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
}