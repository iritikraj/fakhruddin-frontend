import { Metadata } from 'next';
import WellTechPage from './index';

export const metadata: Metadata = {
  title: 'Welltech | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <WellTechPage />;
}