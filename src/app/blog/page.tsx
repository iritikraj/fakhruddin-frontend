// app/blog/page.tsx
import { Metadata } from 'next';
import BlogListingPage from './index';

export const metadata: Metadata = {
  title: 'Blogs | Fakhruddin Properties',
  description: '',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <BlogListingPage />;
}