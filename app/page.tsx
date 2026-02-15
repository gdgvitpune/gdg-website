"use client"
import { useState, useEffect } from 'react';
import SpaceLoader from '@/components/SpaceLoader';
import Galaxy from '@/components/Galaxy';
import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Events } from '@/components/sections/Events';
import { TeamSection } from '@/components/sections/TeamSection';
import { Projects } from '@/components/sections/Projects';
import { GallerySection } from '@/components/sections/GallerySection';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // will check once if user has used the loader in ts session 
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('hasSeenLoader');
    }
    return true;
  });

  useEffect(() => {
    // marking that user has seen the loader
    if (!isLoading && typeof window !== 'undefined') {
      try {
        localStorage.setItem('hasSeenLoader', 'true');
      } catch (e) {
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const OPEN_TABS_KEY = 'gdg_open_tabs';

    const safeParse = (v: string | null) => {
      const n = parseInt(v || '0', 10);
      return Number.isFinite(n) ? n : 0;
    };

    try {
      const cur = safeParse(localStorage.getItem(OPEN_TABS_KEY));
      localStorage.setItem(OPEN_TABS_KEY, String(cur + 1));
    } catch (e) {
    }

    const handleBeforeUnload = () => {
      try {
        const cur = safeParse(localStorage.getItem(OPEN_TABS_KEY));
        const next = Math.max(0, cur - 1);
        localStorage.setItem(OPEN_TABS_KEY, String(next));
        if (next === 0) {
          localStorage.removeItem('hasSeenLoader');
        }
      } catch (e) {
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isLoading) {
    return <SpaceLoader onComplete={() => setIsLoading(false)} duration={3500} />;
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Galaxy Background - Fixed position covering entire viewport */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Galaxy
          mouseRepulsion={false}
          transparent={false}
          starSpeed={0.8}
          density={1}
          hueShift={140}
          speed={1.0}
          glowIntensity={0.3}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
        />
      </div>

      {/* Content - Positioned above the galaxy background */}
       <Hero />
      <div className="relative z-10">
        <Mission />
        <Events />
        <Projects />
        <TeamSection />
        <GallerySection />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}