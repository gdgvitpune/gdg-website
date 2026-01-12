import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "Hack-O-Verse",
        subtitle: "OPEN INNOVATION HACKATHON",
        date: "OCT 12, 2024",
        description: "A flagship open-innovation hackathon where students identify real-world problems and build impactful solutions using Google technologies.",
        color: "from-red-500 to-orange-500",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
        experience: "48 HRS",
        participants: "500+",
        location: "Campus Arena"
    },
    {
        id: 2,
        title: "Create-a-Thon",
        subtitle: "CREATIVE TECH COMPETITION",
        date: "NOV 24, 2024",
        description: "A creative tech competition combining design, storytelling, and technology, encouraging participants to build innovative projects within a fixed theme.",
        color: "from-orange-400 to-yellow-500",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        experience: "2 DAYS",
        participants: "1000+",
        location: "Tech Hub"
    },
    {
        id: 3,
        title: "devX Speaker Series",
        subtitle: "multi-day speaker series",
        date: "DEC 15, 2024",
        description: "A multi-day speaker series featuring industry professionals covering AIML, Web3, and data analytics, including sessions on machine learning, blockchain fundamentals, and a Tableau workshop conducted in collaboration with the Tableau Ambassador Program.",
        color: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        experience: "6 HRS",
        participants: "300+",
        location: "CS Building"
    },
    {
        id: 4,
        title: "Web Blitz",
        subtitle: "MACHINE LEARNING BOOTCAMP",
        date: "JAN 20, 2025",
        description: "A hands-on web development workshop focused on HTML, CSS, JavaScript, React basics, and modern web practices to kickstart students’ web development journey.",
        color: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        experience: "3 DAYS",
        participants: "200+",
        location: "Lab Complex"
    },
    {
        id: 5,
        title: "Flutter Forge",
        subtitle: "BLOCKCHAIN & CRYPTO",
        date: "FEB 10, 2025",
        description: "An immersive Flutter workshop introducing cross-platform app development, UI building, Firebase integration, and real-world app development concepts.",
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
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;
        
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
    }, [activeIndex, isMobile]);

    const getCardPosition = (index: number) => {
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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && activeIndex < events.length - 1) {
                setActiveIndex(activeIndex + 1);
            } else if (diff < 0 && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            }
        }
    };

    const goToPrevious = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => Math.min(events.length - 1, prev + 1));
    };

    const handleDotClick = (e: React.MouseEvent | React.TouchEvent, index: number) => {
        e.stopPropagation();
        setActiveIndex(index);
    };

    return (
        <div ref={sectionRef} className="relative pt-40 pb-32" style={{ height: isMobile ? 'auto' : '400vh' }}>
            {!isMobile && (
                <div
                    className="absolute top-20 left-0 right-0 z-50 flex justify-center transition-opacity duration-500"
                    style={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
                >
                    <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter">
                        EVENTS
                    </h2>
                </div>
            )}

            <div className={`${isMobile ? 'relative' : 'sticky top-0'} h-screen flex items-center justify-center overflow-hidden`}>
                <div className="container mx-auto px-4">
                    
                    {/* Mobile Swipeable Carousel */}
                    {isMobile ? (
                        <div className="mb-8">
                            <h2 className="text-4xl font-black text-white tracking-tighter mb-8 text-center">
                                EVENTS
                            </h2>
                            <div className="relative">
                                <div 
                                    className="overflow-hidden"
                                    style={{ pointerEvents: 'none' }}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div 
                                        className="flex transition-transform duration-300 ease-out"
                                        style={{ transform: `translateX(-${activeIndex * 100}%)`, pointerEvents: 'auto' }}
                                    >
                                        {events.map((event) => (
                                            <div key={event.id} className="w-full flex-shrink-0 px-4">
                                                <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                        style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                                                    
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest text-white mb-4 inline-block">
                                                            UPCOMING
                                                        </div>
                                                        
                                                        <h1 className="text-4xl font-black mb-2 text-white leading-tight">
                                                            {event.title}
                                                        </h1>
                                                        <p className="text-lg italic font-light text-white/70 mb-4">
                                                            {event.subtitle}
                                                        </p>
                                                        
                                                        <p className="text-white/80 leading-relaxed mb-4 text-sm">
                                                            {event.description}
                                                        </p>
                                                        
                                                        <div className="flex items-center gap-2 mb-6 text-white/80">
                                                            <Calendar size={18} />
                                                            <span className="text-sm font-semibold">{event.date}</span>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                                                            <div>
                                                                <div className="text-xs text-white/50 font-bold tracking-widest mb-1 uppercase">Duration</div>
                                                                <h3 className="text-xl font-black text-white">{event.experience}</h3>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-white/50 font-bold tracking-widest mb-1 uppercase">Expected</div>
                                                                <h3 className="text-xl font-black text-white">{event.participants}</h3>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-white/50 font-bold tracking-widest mb-1 uppercase">Venue</div>
                                                                <h3 className="text-base font-black text-white">{event.location}</h3>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-3">
                                                            <button className="flex-1 py-3 px-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all active:scale-95">
                                                                Register
                                                            </button>
                                                            <button className="flex-1 py-3 px-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all active:scale-95 flex items-center justify-center gap-2">
                                                                Details <ArrowRight size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Navigation Controls */}
                                <div className="flex items-center justify-center gap-4 mt-6 relative z-50" style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}>
                                    {/* Previous Button */}
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            goToPrevious(e);
                                        }}
                                        disabled={activeIndex === 0}
                                        className={`p-3 rounded-full border transition-all select-none ${
                                            activeIndex === 0
                                                ? 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                                                : 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 active:scale-95'
                                        }`}
                                        style={{ touchAction: 'manipulation' }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="flex gap-2">
                                        {events.map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={(e) => handleDotClick(e, index)}
                                                onTouchEnd={(e) => {
                                                    e.preventDefault();
                                                    handleDotClick(e, index);
                                                }}
                                                className={`h-2 rounded-full transition-all duration-300 select-none ${
                                                    index === activeIndex 
                                                        ? 'w-8 bg-white' 
                                                        : 'w-2 bg-white/30'
                                                }`}
                                                style={{ touchAction: 'manipulation' }}
                                            />
                                        ))}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            goToNext(e);
                                        }}
                                        disabled={activeIndex === events.length - 1}
                                        className={`p-3 rounded-full border transition-all select-none ${
                                            activeIndex === events.length - 1
                                                ? 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                                                : 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 active:scale-95'
                                        }`}
                                        style={{ touchAction: 'manipulation' }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Desktop Layout */
                        <div className="grid grid-cols-[320px_1fr_1fr] gap-12 items-center max-w-7xl mx-auto">
                            {/* Left: Rotating Carousel */}
                            <div className="relative h-[600px] flex items-center justify-center translate-x-2">

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

                            {/* Center: Content Card */}
                            <div className="relative">
                                <div className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest text-white">
                                            UPCOMING
                                        </div>
                                    </div>

                                    <h1 className="text-2xl md:text-5xl font-black mb-3 text-white leading-tight">
                                        {events[activeIndex].title}
                                    </h1>
                                    <p className="text-sm md:text-lg italic font-light text-white/70 mb-6">
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
                                <div className="relative h-auto md:h-[650px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                    <img
                                        src={events[activeIndex].image}
                                        alt={events[activeIndex].title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                                        <div className="flex items-center gap-2 mb-4 text-white/80">
                                            <Calendar size={18} />
                                            <span className="text-sm font-semibold">{events[activeIndex].date}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <button className="flex-1 py-2 md:py-3 px-3 md:px-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                                Register
                                            </button>
                                            <button className="flex-1 py-2 md:py-3 px-3 md:px-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg text-white text-sm font-bold tracking-wider uppercase transition-all hover:bg-white/15 hover:border-white/60 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2">
                                                Details <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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