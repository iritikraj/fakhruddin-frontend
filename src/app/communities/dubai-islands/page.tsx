import { Metadata } from 'next';
import CommunityPage from './index';

export const metadata: Metadata = {
  title: 'Dubai Islands | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <CommunityPage />;
}