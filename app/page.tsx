import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Events } from '@/components/sections/Events';
import { Achievements } from '@/components/sections/Achievements';
import { Projects } from '@/components/sections/Projects';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Hero />
      <Mission />
      <Events />
      <Achievements />
      <Projects />
      <Footer />
    </main>
  );
}
