import { Metadata } from 'next';
import HomePage from "./(home)";

export const metadata: Metadata = {
  title: 'Welcome to Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Home() {
  return (
    <HomePage />
  );
}