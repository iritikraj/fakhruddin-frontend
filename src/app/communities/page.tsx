export interface Community {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

export const communitiesData: Community[] = [
  {
    id: 'dubai-islands',
    title: 'Dubai Islands',
    slug: '/communities/dubai-islands',
    imageUrl: '/port-1.webp', // Ensure you have these assets in your public folder
  },
  {
    id: 'jvc',
    title: 'Jumeirah Village Circle',
    slug: '/communities/jumeirah-village-circle',
    imageUrl: '/port-2.webp',
  },
  {
    id: 'jvt',
    title: 'Jumeirah Village Triangle',
    slug: '/communities/jumeirah-village-triangle',
    imageUrl: '/port-3.webp',
  },
];

import Navbar from '@/components/Navbar';
import CommunitiesSection from './CommunitiesSection';
import HeroSection from './HeroSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroSection />
      <CommunitiesSection />
      <Footer />
    </main>
  );
}