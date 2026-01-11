import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, MapPin, Users } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "BIT N BUILD",
        subtitle: "INTERNATIONAL HACKATHON",
        date: "OCT 12, 2024",
        description: "48-hour hackathon to transform your ideas into working prototypes. Compete with teams globally and win exciting prizes.",
        color: "from-red-500 to-orange-500",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
        experience: "48 HRS",
        participants: "500+",
        location: "Campus Arena"
    },
    {
        id: 2,
        title: "FUTURE TECH",
        subtitle: "INNOVATION SUMMIT 2024",
        date: "NOV 24, 2024",
        description: "Exploring cutting-edge innovations and future technology trends. Learn from industry leaders and tech visionaries.",
        color: "from-orange-400 to-yellow-500",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        experience: "2 DAYS",
        participants: "1000+",
        location: "Tech Hub"
    },
    {
        id: 3,
        title: "CODE SPRINT",
        subtitle: "COMPETITIVE CODING",
        date: "DEC 15, 2024",
        description: "Test your algorithmic skills in our flagship coding competition. Battle it out with the best programmers.",
        color: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        experience: "6 HRS",
        participants: "300+",
        location: "CS Building"
    },
    {
        id: 4,
        title: "AI WORKSHOP",
        subtitle: "MACHINE LEARNING BOOTCAMP",
        date: "JAN 20, 2025",
        description: "Hands-on workshop on AI and machine learning. Build real ML models and understand neural networks.",
        color: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        experience: "3 DAYS",
        participants: "200+",
        location: "Lab Complex"
    },
    {
        id: 5,
        title: "WEB3 SUMMIT",
        subtitle: "BLOCKCHAIN & CRYPTO",
        date: "FEB 10, 2025",
        description: "Dive into the world of Web3, blockchain technology, and decentralized applications. Shape the future of internet.",
        color: "from-green-500 to-emerald-500",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        experience: "1 DAY",
        participants: "400+",
        location: "Auditorium"
    }
];

export function Events() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollStart = -rect.top;
            const scrollRange = sectionHeight - windowHeight;

            if (scrollStart < 0) {
                setScrollProgress(0);
            } else if (scrollStart > scrollRange) {
                setScrollProgress(1);
            } else {
                const progress = scrollStart / scrollRange;
                setScrollProgress(progress);

                const targetIndex = Math.round(progress * (events.length - 1));
                if (targetIndex !== activeIndex) {
                    setActiveIndex(targetIndex);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeIndex]);

    const getCardPosition = (index: number) => {
        if (isMobile) {
            return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 1 };
        }

        const scrollPos = scrollProgress * (events.length - 1);
        const offset = index - scrollPos;
        const angle = (offset / events.length) * Math.PI * 2;

        const circleRadius = 180;
        const x = Math.cos(angle) * circleRadius - 300;
        const y = Math.sin(angle) * circleRadius;

        const distanceFromCenter = Math.abs(offset);
        const scale = Math.max(0.65, 1 - distanceFromCenter * 0.15);
        const opacity = Math.max(0.2, 1 - distanceFromCenter * 0.5);
        const zIndex = Math.round(100 - Math.abs(offset) * 10);

        return { x, y, scale, opacity, zIndex };
    };

    return (
        <div ref={sectionRef} className="relative bg-black pt-40 pb-32" style={{ height: isMobile ? 'auto' : '400vh' }}>
            <div
                className="absolute top-20 left-0 right-0 z-50 flex justify-center transition-opacity duration-500"
                style={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
            >
                <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter">
                    EVENTS
                </h2>
            </div>
            <div className={`${isMobile ? 'relative' : 'sticky top-0'} h-screen flex items-center justify-center overflow-hidden`}>
                <div className="container mx-auto px-4">
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-[320px_1fr_1fr] gap-12'} items-center max-w-7xl mx-auto`}>

                        {/* Left: Rotating Carousel */}
                        {!isMobile && (
                            <div className="relative h-[600px] flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    {events.map((event, index) => {
                                        const { x, y, scale, opacity, zIndex } = getCardPosition(index);
                                        const isActive = index === activeIndex;

                                        return (
                                            <div
                                                key={event.id}
                                                className="absolute left-1/2 top-1/2 w-56 h-36 transition-all duration-500 ease-out cursor-pointer"
                                                style={{
                                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                                                    opacity,
                                                    zIndex
                                                }}
                                            >
                                                <div className={`relative h-full rounded-2xl overflow-hidden border transition-all duration-300 ${isActive
                                                        ? 'border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                                                        : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                                                    } bg-white/5 backdrop-blur-xl hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                        style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.8)' }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <div className="text-xs text-white/60 font-bold tracking-widest mb-1">
                                                            {String(index + 1).padStart(2, '0')}.
                                                        </div>
                                                        <div className="text-sm font-bold text-white tracking-wider">
                                                            {event.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Center: Content Card */}
                        <div className="relative">
                            <div className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest text-white">
                                        UPCOMING
                                    </div>
                                </div>

                                <h1 className="text-5xl font-black mb-3 text-white leading-tight">
                                    {events[activeIndex].title}
                                </h1>
                                <p className="text-lg italic font-light text-white/70 mb-6">
                                    {events[activeIndex].subtitle}
                                </p>

                                <div className="mb-6">
                                    <div className="text-xs text-white/50 font-bold tracking-widest mb-2 uppercase">
                                        Event Details
                                    </div>
                                    <p className="text-white/80 leading-relaxed">
                                        {events[activeIndex].description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                                    <div>
                                        <div className="text-xs text-white/50 font-bold tracking-widest mb-2 uppercase">Duration</div>
                                        <h3 className="text-2xl font-black text-white">{events[activeIndex].experience}</h3>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/50 font-bold tracking-widest mb-2 uppercase">Expected</div>
                                        <h3 className="text-2xl font-black text-white">{events[activeIndex].participants}</h3>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/50 font-bold tracking-widest mb-2 uppercase">Venue</div>
                                        <h3 className="text-lg font-black text-white">{events[activeIndex].location}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Preview Card */}
                        <div className="relative w-full max-w-md mx-auto">
                            <div className="relative h-[650px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                <img
                                    src={events[activeIndex].image}
                                    alt={events[activeIndex].title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-2 mb-4 text-white/80">
                                        <Calendar size={18} />
                                        <span className="text-sm font-semibold">{events[activeIndex].date}</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 px-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                            Register
                                        </button>
                                        <button className="flex-1 py-3 px-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all hover:bg-white/15 hover:border-white/60 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2">
                                            Details <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {!isMobile && scrollProgress < 0.1 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-wider z-50 animate-pulse">
                    SCROLL TO EXPLORE ↓
                </div>
            )}
        </div>
    );
}