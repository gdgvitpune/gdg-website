"use client"
import { useState } from 'react';
import Link from 'next/link';
import { NewsletterForm } from '@/components/NewsletterForm';  // Import NewsletterForm
import { Footer } from '@/components/sections/Footer';
import AndroidMascot from '@/components/AndroidMascot';
import { ArrowLeft } from 'lucide-react';

export default function NewsletterPage() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [mascotEmotion, setMascotEmotion] = useState<'neutral' | 'happy' | 'success' | 'sad'>('neutral');

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* GIF Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/1.gif')"
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Go Back Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/"
          className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24">
        <div className="flex flex-col">
          <section className="relative min-h-screen flex items-center justify-center py-20">
            <div className="relative container mx-auto px-4">
              <NewsletterForm onHoverChange={setIsButtonHovered} />
            </div>
            {/* Android Mascot Container */}
            <div className="absolute bottom-0 right-0 w-full pointer-events-none">
              <AndroidMascot 
                isHappy={isButtonHovered}
                emotion={mascotEmotion}
              />
            </div>
          </section>
        </div>
      </div>
      <Footer isNewsletterPage={true} />
    </main>
  );
}