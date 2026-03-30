import { Metadata } from 'next';
import ChannelPartnerPage from './index';

export const metadata: Metadata = {
  title: 'Channel Partner | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <ChannelPartnerPage />;
}