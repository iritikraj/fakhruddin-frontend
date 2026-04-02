// app/blog/page.tsx
import { Metadata } from 'next';
import PrivacyPolicyPage from './index';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fakhruddin Properties',
  description: '',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <PrivacyPolicyPage />;
}