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
      return !sessionStorage.getItem('hasSeenLoader');
    }
    return true;
  });

  useEffect(() => {
    // marking that user has seen the loader
    if (!isLoading && typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenLoader', 'true');
    }
  }, [isLoading]);

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