"use client"
import { useState } from 'react';
import NewsletterNavbar from '@/components/NewsletterNavbar';
import Galaxy from '@/components/Galaxy';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/sections/Footer';
import AndroidMascot from '@/components/AndroidMascot';

export default function NewsletterPage() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white relative">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {/* <Galaxy
          mouseRepulsion={true}
          transparent={false}
          starSpeed={1.2}
          density={1.5}
          hueShift={180}  // Different hue for blue/purple theme
          speed={1.5}
          glowIntensity={0.4}
          twinkleIntensity={0.4}
          rotationSpeed={0.08}
        /> */}
      </div>

      {/* Navbar */}
      <NewsletterNavbar />

      {/* Content - Positioned above the galaxy background */}
      <div className="relative z-10 pt-24">
        <div className="flex flex-col">
          {/* Newsletter Section - Full screen with mascot */}
          <section className="relative min-h-screen flex items-center justify-center py-20">
            <div className="relative -top-15 container mx-auto px-4">
              <Newsletter onHoverChange={setIsButtonHovered} />
            </div>
            {/* Android Mascot Container - Positioned at section bottom */}
            <div className="absolute bottom-0 right-0 w-full pointer-events-none">
              <AndroidMascot isHappy={isButtonHovered} />
            </div>
          </section>

          {/* Footer */}
          
        </div>
      </div>
      <Footer />
    </main>
  );
}