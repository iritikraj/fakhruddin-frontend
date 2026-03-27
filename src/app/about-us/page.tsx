import { Metadata } from 'next';
import AboutPage from './index';

export const metadata: Metadata = {
  title: 'About Us | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <AboutPage />;
}