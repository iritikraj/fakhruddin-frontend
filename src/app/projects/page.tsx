import { Metadata } from 'next';
import ProjectsPage from './index';

export const metadata: Metadata = {
  title: 'Projects | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <ProjectsPage />;
}