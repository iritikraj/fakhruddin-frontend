import { Metadata } from 'next';
import CommunityPage from './index';

export const metadata: Metadata = {
  title: 'Dubai Island | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <CommunityPage />;
}