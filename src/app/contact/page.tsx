import { Metadata } from 'next';
import ContactPage from './index';

export const metadata: Metadata = {
  title: 'Contact Us | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <ContactPage />;
}