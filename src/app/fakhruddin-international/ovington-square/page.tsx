import { Metadata } from 'next';
import ProjectDetailPage from './index';

export const metadata: Metadata = {
  title: 'Ovington Square | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <ProjectDetailPage />;
}